using System;
using System.Collections.Generic;
using System.IO;

namespace KendoAspNetCoreClient.Database
{
    public class PerformanceSnapshot
    {
        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        public DateTime StatTime { get; set; }

        public int Backlog { get; set; }

        public DateTime LastReceivedOn { get; set; }

        public int TotalReceived { get; set; }

        public int DatabaseConnections { get; set; }

        public int IdleDatabaseConnections { get; set; }

        public double PctProcessorTime { get; set; }

        public int AvailableMBytes { get; set; }

        public double PctPagingFileUsage { get; set; }
        
        public static IEnumerable<PerformanceSnapshot> Load()
        {
            var db = Path.Combine(Directory.GetCurrentDirectory(), "Database\\PerformanceSnapshots.csv");
            using (var stream = File.OpenRead(db))
            {
                using (var reader = new StreamReader(stream))
                {
                    // Read the column line
                    if(reader.EndOfStream)
                        yield return null;
                    reader.ReadLine();

                    while(!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();
                        yield return ParseLine(line);
                    }
                }
            }
        }

        public static PerformanceSnapshot ParseLine(string line)
        {
            try
            {
                var trim = new [] { ' ', '"' };

                var fields = line.Split(new [] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                if(fields.Length != 11)
                    throw new ArgumentException($"{nameof(ParseLine)}: Wrong number of fields found in line", nameof(line));
            
                return new PerformanceSnapshot
                {
                    CustomerId = int.Parse(fields[0].Trim(trim)),
                    CustomerName = fields[1].Trim(trim),
                    StatTime = new DateTime(DateTime.Parse(fields[2].Trim(trim)).Ticks, DateTimeKind.Utc),
                    Backlog = int.Parse(fields[3].Trim(trim)),
                    LastReceivedOn = new DateTime(DateTime.Parse(fields[4].Trim(trim)).Ticks, DateTimeKind.Utc),
                    TotalReceived = int.Parse(fields[5].Trim(trim)),
                    DatabaseConnections  = int.Parse(fields[6].Trim(trim)),
                    IdleDatabaseConnections = int.Parse(fields[7].Trim(trim)),
                    PctProcessorTime  = double.Parse(fields[8].Trim(trim)),
                    AvailableMBytes  = int.Parse(fields[9].Trim(trim)),
                    PctPagingFileUsage = double.Parse(fields[10].Trim(trim))
                };
            }
            catch (Exception ex)
            {
                NLog.LogManager.GetCurrentClassLogger().Error(ex, $"ERROR: {nameof(Load)} : {ex.GetType()} : {ex.Message}");
                return null;
            }
        }
    }
}