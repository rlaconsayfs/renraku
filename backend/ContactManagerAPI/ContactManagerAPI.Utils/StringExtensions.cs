using System.Globalization;

namespace ContactManagerAPI.Utils
{
    public static class StringExtensions
    {
        /// <summary>
        /// Extension method to convert a string to title case
        /// </summary>
        /// <param name="str"></param>
        /// <returns><paramref name="str"/> in title case</returns>
        public static string ToTitleCase(this string str) =>
            CultureInfo.InvariantCulture.TextInfo.ToTitleCase(str.ToLower());
    }
}
