namespace LaboSemaine8.Data
{
    public class AnimalService 
    {
        protected readonly LaboSemaine8Context _context;

        public AnimalService(LaboSemaine8Context context)
        {
            _context = context;
        }
    }
}
