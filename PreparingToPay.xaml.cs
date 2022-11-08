using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace SE
{
    /// <summary>
    /// Interaction logic for PreparingTopay.xaml
    /// </summary>
    public partial class PreparingToPay : Window
    {
        private const int GWL_STYLE = -16;
        private const int WS_SYSMENU = 0x80000;
        [DllImport("user32.dll", SetLastError = true)]
        private static extern int GetWindowLong(IntPtr hWnd, int nIndex);
        [DllImport("user32.dll")]
        private static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong);
        private const string ukr = "UKR";
        private const string eng = "ENG";
        private string language;
        private const string ip = "192.168.0.105";
        private const int port = 5050;
        public PreparingToPay(string names, string prices, string amounts, string language,string where,string totalPrice)
        {
            this.language = language;
            InitializeComponent();
            if (language == ukr)
            {
                Allright.Content = "Це замовлення представлене добре?";
                Total.Content = "Загальна сума до сплати: ";
                Yes.Content = "ТАК";
                No.Content = "НІ";
            }
            else if (language == eng)
            {
                Allright.Content = "Is this order presented well?";
                Total.Content = "Total amount due: ";
                Yes.Content = "YES";
                No.Content = "NO";
            }
            Where.Content = where;
            LdishName.Content = names;
            Lamount.Content = amounts;
            Lprice.Content = prices;
            Totalprice.Content = totalPrice;
            
        }

        private void close()
        {
            if (MessageBox.Show("Close Application?", "", MessageBoxButton.YesNo, MessageBoxImage.Warning) != MessageBoxResult.No)
                Close();
        }
        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            var hwnd = new WindowInteropHelper(this).Handle;
            SetWindowLong(hwnd, GWL_STYLE, GetWindowLong(hwnd, GWL_STYLE) & ~WS_SYSMENU);
        }

        private void No_Click(object sender, RoutedEventArgs e)
        {
            close();
        }

        private StringBuilder GetInfoFromServer(string command)
        {
            var answer = new StringBuilder();
            try
            {
                IPEndPoint EndPoint = new IPEndPoint(IPAddress.Parse(ip), port);
                Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                var data = Encoding.UTF8.GetBytes(command);
                socket.Connect(EndPoint);
                socket.Send(data);
                var buffer = new byte[512];
                var size = 0;
                do
                {
                    size = socket.Receive(buffer);
                    answer.Append(Encoding.UTF8.GetString(buffer, 0, size));
                }
                while (socket.Available > 0);
                socket.Shutdown(SocketShutdown.Both);
                socket.Close();
            }
            catch (SocketException e)
            {
                if (language == ukr)
                    MessageBox.Show("Вибачте, щось не так з сервером");
                else if (language == eng)
                    MessageBox.Show("Sorry, something is wrong with the server");
            }
            return answer;
        }

        private void Yes_Click(object sender, RoutedEventArgs e)
        {
            Hide();
            Pay pay = new Pay(Totalprice.Content.ToString(), language);
            pay.ShowDialog();
            if (pay.Paymentresults())
            {
                //Оплата пройшла успішно
                //Show();
                pay.Close();

                string command = "Create order|";
                command += LdishName.Content.ToString() + "|";
                command += Lprice.Content.ToString() + "|";
                command += Lamount.Content.ToString();
                try
                {
                    StringBuilder res = GetInfoFromServer(command);
                    if (language == ukr)
                    {
                        Allright.Content = "Ваше замовлення оплачено та прийнято!";
                        order.Content = "Номер вашого замовлення: " + res.ToString();
                        No.Content = "Завершити роботу із замовленням та закрити додаток";
                    }
                    else if (language == eng)
                    {
                        {
                            Allright.Content = "Your order has been paid and accepted!";
                            order.Content = "Your order number: " + res.ToString();
                            No.Content = "Complete the work with the order and close the application";

                        }
                    }
                    order.Visibility = Visibility.Visible;
                    Yes.Visibility = Visibility.Hidden;
                    No.Width = 390;
                    No.FontSize = 14;
                    Totalprice.FontSize = 30;
                    Totalprice.HorizontalContentAlignment = HorizontalAlignment.Left;
                    Width += 140;
                    Show();
                }
                catch (Exception ex)
                {

                    MessageBox.Show(ex.Message);
                }
            }
            else
            {
                Show();
                MessageBox.Show("Оплата не пройшла успішно");
                pay.Close();
            }

        }
    }
}
