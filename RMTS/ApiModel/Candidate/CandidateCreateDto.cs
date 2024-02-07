namespace RMTS.ApiModel.Candidate
{
    public class CandidateCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string CoverLetter { get; set; }
        public int JobId { get; set; }
    }
}
