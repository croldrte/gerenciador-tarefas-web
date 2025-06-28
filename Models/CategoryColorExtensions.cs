namespace TaskManager.Models
{
    public static class CategoryColorExtensions
    {
        public static string ToRGB(this string colorName)
        {
            return colorName switch
            {
                "Red" => "255, 147, 139",
                "Green" => "106, 196, 109",
                "Blue" => "108, 182, 255",
                "Pink" => "252, 141, 199",
                "Yellow" => "218, 170, 63",
                "Purple" => "203, 158, 251",
                "Orange" => "246, 157, 80",
                _ => "0, 0, 0"
            };
        }
    }
}