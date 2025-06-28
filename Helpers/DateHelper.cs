namespace TaskManager.Helpers
{
    public static class DateHelper
    {
        public static string FormatTaskDate(DateTime? dateTime)
        {
            if (dateTime == null) return "";
            var date = dateTime.Value;
            var now = DateTime.Now;
            var today = new DateTime(now.Year, now.Month, now.Day);
            var taskDay = new DateTime(date.Year, date.Month, date.Day);

            var diffDays = (taskDay - today).Days;
            var time = date.ToString("HH:mm");

            if (diffDays == 0)
                return $"Hoje, {time}";
            else if (diffDays == 1)
                return $"Amanhã, {time}";
            else if (diffDays > 1 && diffDays <= 6)
            {
                var daysWeek = new[] { "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado" };
                return $"{daysWeek[(int)date.DayOfWeek]}, {time}";
            }
            else
            {
                string month = date.ToString("MMM").Replace(".", "");
                return $"{date:dd} {month}, {time}";
            }
        }
    }
}