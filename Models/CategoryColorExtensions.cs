namespace TaskManager.Models
{
    public static class CategoryColorExtensions
    {
        public static string ToHex(this string colorName)
        {
            return colorName switch
            {
                "Red" => "#FF938B",
                "Green" => "#6AC46D",
                "Blue" => "#6CB6FF",
                "Pink" => "#FC8DC7",
                "Yellow" => "#DAAA3F",
                "Purple" => "#CB9EFB",
                "Orange" => "#F69D50",
                _ => "#000000"
            };
        }
    }
}