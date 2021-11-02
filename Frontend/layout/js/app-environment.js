var isLocal = true;
var REST_API_BASE = '';
var REST_API_LOGIN = '';
var WEB_REDIRECT_BEFORE = '';
var REST_API_EMPLOYEE_LIST = '';
var WEB_EMPLOYEE_REGISTER = '';
var REST_API_EMPLOYEE_CREATE = '';
var REST_API_EMPLOYEE_UPDATE = '';
var REST_API_EMPLOYEE_READ = '';
var REST_API_EMPLOYEE_DELETE = '';
var REST_API_EMPLOYEE_UPLOAD = '';
var WEB_EMPLOYEE_DETAIL = '';
var CHART_BASE_PATH_QR = 'https://chart.googleapis.com/chart?choe=UTF-8&chs=300x300&cht=qr&chl=';
var WEB_EMPLOYEE_IMAGE = '';
if(isLocal) {
    
    REST_API_BASE = 'http://localhost:8083/api/'
    REST_API_LOGIN =  REST_API_BASE + 'security/login.php';
    REST_API_EMPLOYEE_LIST =  REST_API_BASE + 'employee/readall.php';
    WEB_REDIRECT_BEFORE = 'http://localhost:8084/list.html';
    WEB_EMPLOYEE_REGISTER = 'http://localhost:8084/register.html';
    REST_API_EMPLOYEE_CREATE = REST_API_BASE + 'employee/create.php';
    REST_API_EMPLOYEE_UPDATE = REST_API_BASE + 'employee/update.php';
    REST_API_EMPLOYEE_READ = REST_API_BASE + 'employee/read.php';
    REST_API_EMPLOYEE_DELETE = REST_API_BASE + 'employee/delete.php';
    REST_API_EMPLOYEE_UPLOAD = REST_API_BASE + 'employee/upload.php';
    WEB_EMPLOYEE_DETAIL = 'http://localhost:8084/detail.html';
    WEB_EMPLOYEE_IMAGE = 'http://localhost:8084/uploads/';
} else {

    REST_API_BASE = 'http://localhost:8083/api/';
    REST_API_LOGIN = REST_API_BASE + 'security/login.php';
    WEB_REDIRECT_BEFORE = 'http://localhost:8084/list.html';
    REST_API_EMPLOYEE_LIST = REST_API_BASE + 'employee/readall.php';
    WEB_EMPLOYEE_REGISTER = 'http://localhost:8084/register.html';
    REST_API_EMPLOYEE_CREATE = REST_API_BASE + 'employee/create.php';
    REST_API_EMPLOYEE_UPDATE = REST_API_BASE + 'employee/update.php';
    REST_API_EMPLOYEE_READ = REST_API_BASE + 'employee/read.php';
    REST_API_EMPLOYEE_DELETE = REST_API_BASE + 'employee/delete.php';
    REST_API_EMPLOYEE_UPLOAD = REST_API_BASE + 'employee/upload.php';
    WEB_EMPLOYEE_DETAIL = 'http://localhost:8084/detail.html';
    WEB_EMPLOYEE_IMAGE = 'http://localhost:8083/uploads/';
}
