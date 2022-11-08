using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace SE
{
    /// <summary>
    /// Interaction logic for PreparingToPay.xaml
    /// </summary>
    public partial class Pay : Window
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
        bool res ;
        public Pay( string sumPay, string language)
        {
            InitializeComponent();
            if (language == ukr)
            {
                M.Text = "Місяць";
                Y.Text = "Рік";
                Topay.Text = "До сплати";
                Payment.Text = "Оплата";
                prase.Text = "Щоб почати, заповніть кредитну картку";
                Cancelpayment.Text = "Скасувати платіж";
                PayNow.Content = "Оплатити";
            }
            else if (language == eng)
            {
                M.Text = "Month";
                Y.Text = "Year";
                Topay.Text = "To pay";
                Payment.Text = "Payment";
                prase.Text = "Fill in credit card to begin";
                Cancelpayment.Text = "Cancel your payment";
                PayNow.Content = "Pay Now";
            }
            this.language = language;
            sumToPay.Text = sumPay;
        }

        private void card_PreviewTextInput(object sender, TextCompositionEventArgs e)
        {
            Regex regex = new Regex("[^0-9]+");
            e.Handled = regex.IsMatch(e.Text);
        }

        private void card0_GotMouseCapture(object sender, MouseEventArgs e)
        {
            card0.Text = "";
        }
        private void card1_GotMouseCapture(object sender, MouseEventArgs e)
        {
            card1.Text = "";
        }
        private void card2_GotMouseCapture(object sender, MouseEventArgs e)
        {
            card2.Text = "";
        }
        private void card3_GotMouseCapture(object sender, MouseEventArgs e)
        {
            card3.Text = "";
        }

        private void TextBox_GotMouseCapture(object sender, MouseEventArgs e)
        {
            cvv.Text = "";
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (language == ukr)
            {
                if (MessageBox.Show("Скасувати платіж?", "", MessageBoxButton.YesNo, MessageBoxImage.Warning) != MessageBoxResult.No)
                    Close();
            }
            else if (language == eng)
            {
                if (MessageBox.Show("Cancel payment? ", "", MessageBoxButton.YesNo, MessageBoxImage.Warning) != MessageBoxResult.No)
                    Close();
            } 
        }

        private void PayNow_Click(object sender, RoutedEventArgs e)
        {
            res = true;
            MessageBox.Show("Please wait");
            Regex regex = new Regex("([0]+[1-9])|([1]+[0-2])");
            if (!regex.IsMatch(M.Text.ToString()))
            {
                if (language == ukr)
                    MessageBox.Show("Некоректний формат місяця");
                else if (language == eng)
                    MessageBox.Show("Incorrect month format");
                res = false;
            }
            regex = new Regex("2[3-9]|30");
            if (!regex.IsMatch(Y.Text.ToString()))
            {
                if (language == ukr)
                    MessageBox.Show("Некоректний формат року коректно з 23 до 30");
                else if (language == eng)
                    MessageBox.Show("Incorrect year format correct from 23 to 30");
                res = false;
            }
            regex = new Regex("\\d{4}");
            if (card0.Text.ToString() == "0000" || card0.Text.ToString() == ""
                || card1.Text.ToString() == "0000" || card1.Text.ToString() == ""
                || card2.Text.ToString() == "0000" || card2.Text.ToString() == ""
                || card3.Text.ToString() == "0000" || card3.Text.ToString() == "" 
                || !regex.IsMatch(card0.Text.ToString())
                || !regex.IsMatch(card1.Text.ToString())
                || !regex.IsMatch(card2.Text.ToString())
                || !regex.IsMatch(card3.Text.ToString()))
            {
                if (language == ukr)
                    MessageBox.Show("Некоректний формат номера карти");
                else if (language == eng)
                    MessageBox.Show("Incorrect card number format");
                res = false;
            }
            regex = new Regex("\\d{3}");
            if (cvv.Text.ToString() == "000" || cvv.Text.ToString() == "" || !regex.IsMatch(cvv.Text.ToString()))
            {
                if (language == ukr)
                    MessageBox.Show("Некоректний формат CVV-кода");
                else if (language == eng)
                    MessageBox.Show("Incorrect CVV code format");
                res = false;
            }
            if (res)
            {
                if (language == ukr)
                    MessageBox.Show("Успішна оплата");
                else if (language == eng)
                    MessageBox.Show("Successful payment");
                Paymentresults();
            }
        }

        public bool Paymentresults()
        {
            Close();
            return res;
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            var hwnd = new System.Windows.Interop.WindowInteropHelper(this).Handle;
            SetWindowLong(hwnd, GWL_STYLE, GetWindowLong(hwnd, GWL_STYLE) & ~WS_SYSMENU);
        }

        private void Date_PreviewTextInput(object sender, TextCompositionEventArgs e)
        {
            Regex regex = new Regex("[^0-9]+");
            e.Handled = regex.IsMatch(e.Text);
        }

        private void M_GotMouseCapture(object sender, MouseEventArgs e)
        {
            M.Text = "";
        }

        private void Y_GotMouseCapture(object sender, MouseEventArgs e)
        {
            Y.Text = "";
        }
    }
}
