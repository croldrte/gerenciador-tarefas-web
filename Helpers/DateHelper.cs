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
            var hora = date.ToString("HH:mm");

            if (diffDays == 0)
                return $"Hoje {hora}";
            else if (diffDays == 1)
                return $"Amanhã {hora}";
            else if (diffDays > 1 && diffDays <= 6)
            {
                var diasSemana = new[] { "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado" };
                return $"{diasSemana[(int)date.DayOfWeek]} {hora}";
            }
            else
                return $"{date:dd/MM} {hora}";
        }
    }
}