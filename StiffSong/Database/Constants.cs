namespace StiffSonngBackend.Database
{
    public class Constants
    {
        private static string LocalConnectionString =
            @"Data Source=localhost;Initial Catalog=Songs;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public static string ProdConnectionString =
            @"Server=blue.globenet.cz;Database=d003739;User Id=d003739a;Password=snaxfr5jNE;";

        public static string ConnectionString => LocalConnectionString;

    }
}