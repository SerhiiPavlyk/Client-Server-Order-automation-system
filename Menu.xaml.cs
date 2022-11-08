using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace SE
{

    public partial class Menu : Window
    {
        private const int GWL_STYLE = -16;
        private const int WS_SYSMENU = 0x80000;
        [DllImport("user32.dll", SetLastError = true)]
        private static extern int GetWindowLong(IntPtr hWnd, int nIndex);
        [DllImport("user32.dll")]
        private static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong);
        private const string ukr = "UKR";
        private const string eng = "ENG";
        private const string ip = "192.168.0.105";
        private const int port = 5050;
        private LanguageSeter languageSeter = new LanguageSeter(ukr);
        private string GlobalLanguage;
        private string GlobalWhere;

        public Menu(string language, bool where)
        //where = 0 - here
        //where = 1 - takeaway
        {
            try
            {
                InitializeComponent();
                DataContext = LanguageSeter.GetLanguage(language);
                GlobalLanguage = language;
                languageSeter.fieldsetter(language);
                if (where && language == ukr)
                {
                    GlobalWhere = "Ваше замовлення - Собою";
                    BasketL.Content = GlobalWhere;
                    totalprice.Content = "Загальна сума до сплати: ";
                    Done.Content = "Готово";
                    Close.Content = "Повернутися назад";
                }
                else if (!where && language == ukr)
                {
                    GlobalWhere = "Ваше замовлення - В залі";
                    BasketL.Content = GlobalWhere;
                    totalprice.Content = "Загальна сума до сплати: ";
                    Done.Content = "Готово";
                    Close.Content = "Повернутися назад";
                }
                else if (where && language == eng)
                {
                    GlobalWhere = "Your order - Takeaway";
                    BasketL.Content = GlobalWhere;
                    totalprice.Content = "Total amount due: ";
                    Done.Content = "Done";
                    Close.Content = "Go back";
                }
                else if (!where && language == eng)
                {
                    GlobalWhere = "Your order - Here";
                    BasketL.Content = GlobalWhere;
                    totalprice.Content = "Total amount due: ";
                    Done.Content = "Done";
                    Close.Content = "Go back";
                }
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }

        }

        private void Loadmenu(List<string> massinfo)
        {
            B_Element00_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element01_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element02_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element10_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element11_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element12_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element20_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element21_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element22_name.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
            B_Element00_name.Visibility = Visibility.Hidden;
            B_Element01_name.Visibility = Visibility.Hidden;
            B_Element02_name.Visibility = Visibility.Hidden;
            B_Element10_name.Visibility = Visibility.Hidden;
            B_Element11_name.Visibility = Visibility.Hidden;
            B_Element12_name.Visibility = Visibility.Hidden;
            B_Element20_name.Visibility = Visibility.Hidden;
            B_Element21_name.Visibility = Visibility.Hidden;
            B_Element22_name.Visibility = Visibility.Hidden;
            for (int i = 0; i < 18;)
            {
                B_Element00_name.Content = massinfo[i];
                if (B_Element00_name.Content.ToString() != "" && B_Element00_name.Content.ToString() != " ")
                {
                    B_Element00_name.Visibility = Visibility.Visible;
                    B_Element00_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element00.Content = massinfo[i + 1];
                i += 2;
                B_Element01_name.Content = massinfo[i];
                if (B_Element01_name.Content.ToString() != "" && B_Element01_name.Content.ToString() != " ")
                {
                    B_Element01_name.Visibility = Visibility.Visible;
                    B_Element01_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element01.Content = massinfo[i + 1];
                i += 2;
                B_Element02_name.Content = massinfo[i];
                if (B_Element02_name.Content.ToString() != "" && B_Element02_name.Content.ToString() != " ")
                {
                    B_Element02_name.Visibility = Visibility.Visible;
                    B_Element02_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element02.Content = massinfo[i + 1];
                i += 2;
                B_Element10_name.Content = massinfo[i];
                if (B_Element10_name.Content.ToString() != "" && B_Element10_name.Content.ToString() != " ")
                {
                    B_Element10_name.Visibility = Visibility.Visible;
                    B_Element10_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element10.Content = massinfo[i + 1];
                i += 2;
                B_Element11_name.Content = massinfo[i];
                if (B_Element11_name.Content.ToString() != "" && B_Element11_name.Content.ToString() != " ")
                {
                    B_Element11_name.Visibility = Visibility.Visible;
                    B_Element11_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element11.Content = massinfo[i + 1];
                i += 2;
                B_Element12_name.Content = massinfo[i];
                if (B_Element12_name.Content.ToString() != "" && B_Element12_name.Content.ToString() != " ")
                {
                    B_Element12_name.Visibility = Visibility.Visible;
                    B_Element12_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element12.Content = massinfo[i + 1];
                i += 2;
                B_Element20_name.Content = massinfo[i];
                if (B_Element20_name.Content.ToString() != "" && B_Element20_name.Content.ToString() != " ")
                {
                    B_Element20_name.Visibility = Visibility.Visible;
                    B_Element20_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element20.Content = massinfo[i + 1];
                i += 2;
                B_Element21_name.Content = massinfo[i];
                if (B_Element21_name.Content.ToString() != "" && B_Element21_name.Content.ToString() != " ")
                {
                    B_Element21_name.Visibility = Visibility.Visible;
                    B_Element21_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element21.Content = massinfo[i + 1];
                i += 2;
                B_Element22_name.Content = massinfo[i];
                if (B_Element22_name.Content.ToString() != "" && B_Element22_name.Content.ToString() != " ")
                {
                    B_Element22_name.Visibility = Visibility.Visible;
                    B_Element22_name.Background = new SolidColorBrush(Color.FromRgb(204, 221, 183));
                }
                price_Element22.Content = massinfo[i + 1];
                i += 2;
            }
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
                MessageBox.Show(languageSeter.ServerError);
            }
            return answer;
        }

        private void Chiken_Click(object sender, RoutedEventArgs e)
        {
            MenuDetail.Visibility = Visibility.Visible;
            string answer_s = GetInfoFromServer(languageSeter.Chicken).ToString();
            List<string> massinfo = new List<string>(answer_s.Split('|'));
            if (massinfo.Count < 18)
            {
                for (int i = massinfo.Count; i < 18; i++)
                {
                    massinfo.Add(" ");
                }
            }
            Loadmenu(massinfo);
        }



        private void Burgers_Click(object sender, RoutedEventArgs e)
        {
            string answer_s = GetInfoFromServer(languageSeter.Burgers).ToString();
            List<string> massinfo = new List<string>(answer_s.Split('|'));
            if (massinfo.Count < 18)
            {
                for (int i = massinfo.Count; i < 18; i++)
                {
                    massinfo.Add(" ");
                }
            }
            Loadmenu(massinfo);
        }

        private void Sauces_Click(object sender, RoutedEventArgs e)
        {
            string answer_s = GetInfoFromServer(languageSeter.Sauces).ToString();
            List<string> massinfo = new List<string>(answer_s.Split('|'));
            if (massinfo.Count < 18)
            {
                for (int i = massinfo.Count; i < 18; i++)
                {
                    massinfo.Add(" ");
                }
            }
            Loadmenu(massinfo);
        }

        private void Desserts_Click(object sender, RoutedEventArgs e)
        {
            string answer_s = GetInfoFromServer(languageSeter.Desserts).ToString();
            List<string> massinfo = new List<string>(answer_s.Split('|'));
            if (massinfo.Count < 18)
            {
                for (int i = massinfo.Count; i < 18; i++)
                {
                    massinfo.Add(" ");
                }
            }
            Loadmenu(massinfo);
        }

        private void Drinks_Click(object sender, RoutedEventArgs e)
        {
            string answer_s = GetInfoFromServer(languageSeter.Drinks).ToString();
            List<string> massinfo = new List<string>(answer_s.Split('|'));
            if (massinfo.Count < 18)
            {
                for (int i = massinfo.Count; i < 18; i++)
                {
                    massinfo.Add(" ");
                }
            }
            Loadmenu(massinfo);
        }

        private void Coffee_Click(object sender, RoutedEventArgs e)
        {
            string answer_s = GetInfoFromServer(languageSeter.Coffee).ToString();
            List<string> massinfo = new List<string>(answer_s.Split('|'));
            if (massinfo.Count < 18)
            {
                for (int i = massinfo.Count; i < 18; i++)
                {
                    massinfo.Add(" ");
                }
            }
            Loadmenu(massinfo);
        }

        private void Potato_Click(object sender, RoutedEventArgs e)
        {
            string answer_s = GetInfoFromServer(languageSeter.Potato).ToString();
            List<string> massinfo = new List<string>(answer_s.Split('|'));
            if (massinfo.Count < 18)
            {
                for (int i = massinfo.Count; i < 18; i++)
                {
                    massinfo.Add(" ");
                }
            }
            Loadmenu(massinfo);
        }



        private void createBasket(string nameOfDish, string price)
        {
            if (LdishName.Content != null)
            {

                if (LdishName.Content.ToString().Contains(nameOfDish))
                {
                    string[] massOfNames = LdishName.Content.ToString().Split('\n');
                    int posOfWanted = 0;
                    for (int i = 0; i < massOfNames.Length; i++)
                    {
                        if (massOfNames[i] == nameOfDish)
                        {
                            posOfWanted = i;
                            break;
                        }
                    }
                    string[] massOfAmount = Lamount.Content.ToString().Split('\n');
                    massOfAmount[posOfWanted] = (Int32.Parse(massOfAmount[posOfWanted]) + 1).ToString();
                    Lamount.Content = "\n";
                    for (int i = 0; i < massOfAmount.Length; i++)
                    {
                        if (massOfAmount[i] != "" && massOfAmount[i] != "\n")
                            Lamount.Content += massOfAmount[i] + "\n";
                    }
                }
                else
                {
                    LdishName.Content += "\n" + nameOfDish;
                    Lprice.Content += "\n" + price;
                    if (Lamount.Content.ToString()[Lamount.Content.ToString().Length - 1] != '\n')
                        Lamount.Content += "\n1";
                    else
                        Lamount.Content += "1";
                }

            }
            else
            {
                LdishName.Content += "\n" + nameOfDish;
                Lprice.Content += "\n" + price;
                Lamount.Content += "\n1";
            }
            Ltotalprice.Content = CalcTotalPrice().ToString();
            Done.Visibility = Visibility.Visible;
        }
        private double CalcTotalPrice()
        {
            double res = 0;
            string[] massOfprice = Lprice.Content.ToString().Split('\n');
            string[] massOfAmount = Lamount.Content.ToString().Split('\n');
            for (int i = 0; i < massOfAmount.Length; i++)
            {
                if (massOfAmount[i] != "" && massOfAmount[i] != "\n" && massOfprice[i] != "" && massOfprice[i] != "\n")
                    res += double.Parse(massOfprice[i]) * int.Parse(massOfAmount[i]);

            }
            return res;
        }

        private void B_Element00_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element00_name.Content.ToString(), price_Element00.Content.ToString());
        }
        private void B_Element01_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element01_name.Content.ToString(), price_Element01.Content.ToString());
        }
        private void B_Element02_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element02_name.Content.ToString(), price_Element02.Content.ToString());
        }
        private void B_Element10_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element10_name.Content.ToString(), price_Element10.Content.ToString());
        }
        private void B_Element11_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element11_name.Content.ToString(), price_Element11.Content.ToString());
        }
        private void B_Element12_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element12_name.Content.ToString(), price_Element12.Content.ToString());
        }
        private void B_Element20_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element20_name.Content.ToString(), price_Element20.Content.ToString());
        }
        private void B_Element21_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element21_name.Content.ToString(), price_Element21.Content.ToString());
        }
        private void B_Element22_name_Click(object sender, RoutedEventArgs e)
        {
            createBasket(B_Element22_name.Content.ToString(), price_Element22.Content.ToString());
        }

        private void waitEnd(PreparingToPay window)
        {
            
        }

        private void Done_Click(object sender, RoutedEventArgs e)
        {

            PreparingToPay preparingToPay = new PreparingToPay( LdishName.Content.ToString(), Lprice.Content.ToString(), Lamount.Content.ToString(),GlobalLanguage, GlobalWhere,Ltotalprice.Content.ToString());
            Hide();
            preparingToPay.ShowDialog();
            Close();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            var hwnd = new System.Windows.Interop.WindowInteropHelper(this).Handle;
            SetWindowLong(hwnd, GWL_STYLE, GetWindowLong(hwnd, GWL_STYLE) & ~WS_SYSMENU);
        }

        private void Close_Click(object sender, RoutedEventArgs e)
        {
            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
            Close();
        }
    }
}
