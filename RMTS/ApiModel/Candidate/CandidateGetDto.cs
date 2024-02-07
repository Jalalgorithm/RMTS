namespace RMTS.ApiModel.Candidate
{
    public class CandidateGetDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Phone { get; set; }
        public string CoverLetter { get; set; }
        public string ResumeUrl { get; set; }
        public int JobId { get; set; }
        public string JobTitle { get; set; }
    }
}
