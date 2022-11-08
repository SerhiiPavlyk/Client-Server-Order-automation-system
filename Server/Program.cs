using System;
using System.Data.SqlClient;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Diagnostics;
using System.Collections.Generic;

namespace Server
{
    class Program
    {
        public static string connectionString = @"Data Source=localhost;Database=Menu;User ID=SERHII; Password=QWEasd16";
        public static SqlConnection cnn = new SqlConnection(connectionString);
        static void Main(string[] args)
        {
            const string ip = "192.168.0.105";
            const int port = 5050;
            try
            {
                cnn.Open();
                Console.WriteLine("Connection to bd Opened succsessfully!");
            }
            catch (Exception)
            {

                Console.WriteLine("Connection to bd don`t opened");
            }
            IPEndPoint EndPoint = new IPEndPoint(IPAddress.Parse(ip), port);
            Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            socket.Bind(EndPoint);
            socket.Listen(5);
            while (true)
            {
                Console.WriteLine("Waiting...");
                var listener = socket.Accept();
                var buffer = new byte[256];
                StringBuilder data = new StringBuilder();
                var size = 0;
                do
                {
                    size = listener.Receive(buffer);
                    data.Append(Encoding.UTF8.GetString(buffer, 0, size));
                }
                while (listener.Available > 0);
                string res = "Error";
                if (data.ToString().Contains("Create order|"))
                {
                    res = data.ToString().Remove(0, "Create order|".Length);
                    res = WriteOrderToDataBase(res);
                    Console.WriteLine("I had sent information about number of Order");
                }
                else
                {
                    res = getInfoMenu(data.ToString());
                    Console.WriteLine("I had sent information about menu");
                }
                listener.Send(Encoding.UTF8.GetBytes(res));
                listener.Shutdown(SocketShutdown.Both);
                listener.Close();
                Console.WriteLine("Close connection with Client");
            }

        }
        static string getInfoMenu(string aboutWhat)
        {
            string res = "";
            string sqlQuery = "SELECT name, price FROM [Menu].[dbo].[DishMenu]  where category = @ID";
            SqlCommand command = new SqlCommand(sqlQuery, cnn);
            command.Parameters.Add("@ID", System.Data.SqlDbType.NChar);
            command.Parameters["@ID"].Value = aboutWhat;
            SqlDataReader reader = command.ExecuteReader();
            byte[] temp = new byte[512];
            while (reader.Read())
            {
                res += reader.GetString(0).Trim() + '|';
                res += reader.GetSqlMoney(1).ToString() + '|';
            }
            reader.Close();
            return res;
        }

        static string WriteOrderToDataBase(string text)
        {

            List<string> massinfo = new List<string>(text.Split('|'));
            List<string[]> massinfo2 = new List<string[]>();
            for (int i = 0; i < massinfo.Count; i++)
            {
                massinfo2.Add(massinfo[i].Split('\n'));
            }
            int OrderID = 0;
            string sqlQueryMax = "SELECT MIN(OrderID) FROM Orders";
            SqlCommand commandMax = new SqlCommand(sqlQueryMax, cnn);
            SqlDataReader reader = commandMax.ExecuteReader();
            while (reader.Read())
            {
                OrderID = reader.GetInt32(0) - 1;
            }
            reader.Close();
            string sqlQuery = "INSERT INTO [dbo].[Orders]"
           + "([OrderID],[DishName],[Amount],[Price])"
           + "VALUES (@orderID, @dishName, @amount, @price)";
            for (int i = 1; i < massinfo2[0].Length; i++)
            {
                SqlCommand command = new SqlCommand(sqlQuery, cnn);
                command.Parameters.Add("@orderID", System.Data.SqlDbType.Int);
                command.Parameters["@orderID"].Value = OrderID;
                command.Parameters.Add("@dishName", System.Data.SqlDbType.NChar);
                command.Parameters["@dishName"].Value = massinfo2[0][i];
                command.Parameters.Add("@amount", System.Data.SqlDbType.Int);
                command.Parameters["@amount"].Value = int.Parse(massinfo2[2][i]);
                command.Parameters.Add("@price", System.Data.SqlDbType.Money);
                command.Parameters["@price"].Value = Double.Parse(massinfo2[1][i]);
                command.ExecuteNonQuery();
            }
            return OrderID.ToString();
        }
    }
}
