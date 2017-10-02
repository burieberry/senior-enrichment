import React from 'react';
import { connect } from 'react-redux';
import { editForm, updateCampus, updateStudent, showForm } from '../store';

const EditCampus = ({ students, campus, form, title, onChange, onSubmit, onClose }) => {
  return (
    <section className="col-xs-4">
      {
        form && (
          <div className="panel panel-default">
            <h3 className="panel-heading">{ title }</h3>

            <form onSubmit={ onSubmit } className="panel-body">
              <div className="form-group row">
                <label className="col-xs-3 col-form-label">Campus Name: </label>
                <div className="col-xs-8">
                  <input name="name" value={ campus.name } onChange={ onChange } className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xs-3 col-form-label">Campus Photo: </label>
                <div className="col-xs-8">
                  <input name="image" value={ campus.image } onChange={ onChange } className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xs-3 col-form-label">Enroll Students: </label>
                <div className="col-xs-8">
                  <select name="studentId" onChange={ onChange } className="form-control">
                    {
                      students.map(student => {
                        if (student.campusId !== campus.id) {
                          return (
                            <option value={ student.id * 1 } key={ student.id }>{ student.name }</option>
                          );
                        }
                      })
                    }
                  </select>
                </div>
              </div>

              <div className="pull-right">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button onClick={() => onClose()} className="close-btn btn btn-danger">Close</button>
              </div>
            </form>
          </div>
        )
      }
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    campus: state.campus,
    students: state.students,
    form: state.form
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange(ev) {
      const change = {};
      change[ev.target.name] = ev.target.value;
      const campus = Object.assign(ownProps.campus, change);
      dispatch(editForm(campus));
    },
    onSubmit(ev) {
      ev.preventDefault();
      const name = ev.target.name.value;
      const image = ev.target.image.value;
      const studentId = ev.target.studentId.value * 1;
      const { id } = ownProps.match.params;
      Promise.all([
        dispatch(showForm(false)),
        dispatch(updateStudent(studentId, { campusId: id * 1 })),
        dispatch(updateCampus(id, { name, image }))
      ])
        .catch(console.error)
    },
    onClose() {
      dispatch(showForm(false));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampus);
