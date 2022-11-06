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
using System.Windows.Shapes;

namespace SE
{
    /// <summary>
    /// Interaction logic for PreparingToPay.xaml
    /// </summary>
    public partial class PreparingToPay : Window
    {
        public PreparingToPay(string totalprice, string names, string prices, string amounts)
        {
            InitializeComponent();
        }
    }
}
