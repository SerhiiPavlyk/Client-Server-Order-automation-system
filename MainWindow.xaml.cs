using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace SE
{
    public partial class MainWindow : Window
    {
        private string language = "UKR"; //defalt
        public MainWindow()
        {
            InitializeComponent();
            DataContext = LanguageSeter.GetLanguage(language);// defalt UKR
        }

        private void EN_Click(object sender, RoutedEventArgs e)
        {
            language = "ENG";
            DataContext = LanguageSeter.GetLanguage(language);
        }

        private void UA_Click(object sender, RoutedEventArgs e)
        {
            language = "UKR";
            DataContext = LanguageSeter.GetLanguage(language);
        }

        private void Here_Click(object sender, RoutedEventArgs e)
        {
            //false here
            Menu menu = new Menu(language, false);
            Application.Current.MainWindow = this;
            Close();
            menu.Show();
        }
        private void Out_Click(object sender, RoutedEventArgs e)
        {
            // true - takeaway
            Menu menu = new Menu(language, true);
            Close();
            menu.Show();
        }
    }

}
