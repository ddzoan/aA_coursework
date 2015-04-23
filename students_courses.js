function Student(fname, lname){
  this.fname = fname;
  this.lname = lname;
  this.enrolledCourses = [];
}

Student.prototype.name = function(){
  console.log(this.fname + ' ' + this.lname);
};

Student.prototype.courses = function(){
  console.log(this.enrolledCourses);
};

Student.prototype.enroll = function(course){
  if(this.hasConflict(course)){
    return false;
  } else if(course.enrolledStudents.indexOf(this) === -1){
    this.enrolledCourses.push(course);
    course.enrolledStudents.push(this);
  }
};

Student.prototype.courseLoad = function(){
  var courseLoad = {};
  for(var i=0; i < this.enrolledCourses.length; i++){
    if(courseLoad[this.enrolledCourses[i].dept]){
      courseLoad[this.enrolledCourses[i].dept] += this.enrolledCourses[i].credits;
    } else {
      courseLoad[this.enrolledCourses[i].dept] = this.enrolledCourses[i].credits;
    }
  }
  console.log(courseLoad);
};

Student.prototype.hasConflict = function(course){
  for(var i = 0; i < this.enrolledCourses.length; i++){
    if(this.enrolledCourses[i].conflictsWith(course)){
      return true;
    }
  }
  return false;
};

function Course(name, dept, credits, block, days){
  this.name = name;
  this.dept = dept;
  this.credits = credits;
  this.enrolledStudents = [];
  this.block = block;
  this.days = days;
}

Course.prototype.students = function() {
  console.log(this.enrolledStudents);
};

Course.prototype.addStudent = function(student) {
  student.enroll(this);
};

Course.prototype.conflictsWith = function (course){
  for(var i=0; i < this.days.length; i++){
    if(course.block !== this.block){
      return false;
    } else {
      if(course.days.indexOf(this.days[i]) !== -1){
        return true;
      } else {
        return false;
      }
    }
  }
};


var dan = new Student('dan', 'dzoan');
var aa = new Course('AA', 'CS',100, 1, ['mon', 'tues']);
var ab = new Course('Ab', 'CS',50, 2, ['weds', 'thurs']);
var asdf = new Course('asdf', 'asdf', 2000, 1, ['mon']);
var student = new Student('rayyan','ahmed');

dan.enroll(aa);
aa.addStudent(dan);
aa.addStudent(student);
dan.enroll(ab);
dan.enroll(asdf);

// console.log(ab.conflictsWith(asdf));
dan.courses();
