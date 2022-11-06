using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE
{
    public class LanguageSeter
    {
        public string title { get; set; }
        public string here { get; set; }
        public string title_where { get; set; }
        public string outHere { get; set; }
        public string Chicken { get; set; }
        public string Burgers { get; set; }
        public string Potato { get; set; }
        public string Sauces { get; set; }
        public string Desserts { get; set; }
        public string Drinks { get; set; }
        public string Coffee { get; set; }
        public string ServerError { get; set; }

        public void fieldsetter(string language)
        {
            if (language == "UKR")
            {
                title = "Виберіть мову";
                here = "В залі";
                outHere = "Собою";
                title_where = "Опція замовлення";
                Chicken = "Курка";
                Burgers = "Бургери";
                Potato = "Картопля";
                Sauces = "Соуси";
                Desserts = "Десерти";
                Drinks = "Напої";
                Coffee = "Кава";
                ServerError = "Вибачте, щось не так з сервером";
            }
            else if (language == "ENG")
            {
                title = "Choose a language";
                here = "Here";
                outHere = "Takeaway";
                title_where = "Order option";
                Chicken = "Chicken";
                Burgers = "Burgers";
                Potato = "Potato";
                Sauces = "Sauces";
                Desserts = "Desserts";
                Drinks = "Drinks";
                Coffee = "Coffee";
                ServerError = "Sorry, something is wrong with the server";
            }
        }

        public LanguageSeter(string language)
        {
            fieldsetter(language);
        }
        public static LanguageSeter GetLanguage(string language)
        {
            LanguageSeter testL = new LanguageSeter(language);
            return testL;
        }
    }
}
