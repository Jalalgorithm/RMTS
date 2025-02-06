# Resume Management System

This project is a Resume Management System built to help users create, store, and manage their resumes. The system provides features such as resume creation, editing, viewing, and exporting in various formats (e.g., PDF, DOCX).

## Features

- **User Registration and Authentication**: Users can register, log in, and log out.
- **Resume Creation**: Users can create resumes by filling in details like personal information, education, work experience, skills, etc.
- **Resume Editing**: Users can edit their resumes at any time.
- **Resume Viewing**: Users can view their created resumes on the platform.
- **Exporting Resumes**: Users can export their resumes in multiple formats such as PDF and DOCX.
- **Responsive UI**: The system has a user-friendly and responsive interface.
  
## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (For UI and interactions).
- **Backend**: Django (for handling the database, logic, and API endpoints).
- **Database**: SQLite (for storing user data and resume information).
- **File Handling**: Libraries for exporting resumes in PDF/DOCX format.

## Installation

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2. **Create a virtual environment**:
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows, use `env\Scripts\activate`
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up the database**:
    ```bash
    python manage.py migrate
    ```

5. **Create a superuser** (optional):
    ```bash
    python manage.py createsuperuser
    ```

6. **Run the development server**:
    ```bash
    python manage.py runserver
    ```

7. Visit `http://127.0.0.1:8000/` in your web browser.

## Usage

1. **Create an Account**: Sign up by providing your email and password.
2. **Login**: Log in to your account to access your resume dashboard.
3. **Create Resume**: Fill in your personal details, education, experience, skills, and more.
4. **Edit Resume**: Update your resume as necessary by revisiting the form.
5. **View Resume**: View your resume in the system.
6. **Export Resume**: Export your resume in PDF or DOCX format by selecting the appropriate export option.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
