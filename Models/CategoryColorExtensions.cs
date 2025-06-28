namespace TaskManager.Models
{
    public static class CategoryColorExtensions
    {
        public static string ToHex(this string colorName)
        {
            return colorName switch
            {
                "Red" => "#FF5733",
                "Green" => "#33FF57",
                "Blue" => "#3357FF",
                "Pink" => "#FF33A8",
                "Yellow" => "#F0E68C",
                "Purple" => "#8A2BE2",
                "Orange" => "#FFA500",
                _ => "#000000"
            };
        }
    }
}