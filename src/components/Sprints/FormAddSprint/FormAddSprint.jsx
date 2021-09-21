import { useFormik } from 'formik';
import * as Yup from 'yup';
import s from './FormAddSprint.module.scss';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import sprintOperations from '../../../redux/sprint/sprin-operations';
import { getLanguage } from '../../../redux/userSettings/userSettingsSelectors.js';
import { languages } from '../../../languages';
import { useParams } from 'react-router';
import CancelBtn from '../../CancelBtn/CancelBtn';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Поле обов'язкове!"),
  date: Yup.date().nullable().required("Поле обов'язкове!"),
  duration: Yup.number().required("Поле обов'язкове!").min(2, 'Min is 2 day'),
});

export default function FormAddSprint({ toggleModal }) {
  const { calendarLocale } = languages[useSelector(getLanguage)];
  console.log('locale ==> ', calendarLocale);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const [check, setCheck] = useState(false);

  const formik = useFormik({
    initialValues: { title: '', duration: '', date: new Date() },
    validationSchema,
    onSubmit: ({ title, duration, date }) => {
      const endDate = moment(date).format('YYYY-M-D');
      dispatch(
        sprintOperations.postSprint({
          projectId,
          body: {
            title,
            endDate,
            duration,
          },
        }),
      );
      toggleModal();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={s.formAddSprint}>
        <p className={s.titel}>Створення спринта</p>
        <Input
          formik={formik}
          name="title"
          label="Назва спринта"
          className={s.inputNameSprint}
        />
        <input
          className={s.checkbox}
          name="check"
          type="checkbox"
          id="green"
          value="green"
          onChange={() => setCheck(!check)}
        />
        <label className={s.checkboxLabel} htmlFor="green">
          Попередні дні
        </label>
        <div className={s.containerDate}>
          <div className={s.datePickerConteiner}>
            <label className={s.datePickerLabel} htmlFor="datePicker">
              <span className={s.datePickerLabel}>Дата закінчення</span>
            </label>
            <DatePicker
              onBlur={() => formik.setFieldTouched('date', true)}
              locale={calendarLocale}
              id="datePicker"
              name="date"
              dateFormatCalendar="LLLL"
              autocomplete="off"
              minDate={check ? null : new Date()}
              dateFormat="dd MMM"
              className={s.date}
              selected={formik.values.date}
              onChange={date => {
                formik.setFieldValue('date', date);
              }}
            />
            {formik.errors.date && formik.touched.date && (
              <span className={s.errorsDate}>{formik.errors.date}</span>
            )}
          </div>

          <Input
            formik={formik}
            type="number"
            name="duration"
            label="Тривалисть"
            className={s.inputDays}
          />
        </div>

        <Button className={s.btnAddSprint} />
      </form>
      <CancelBtn onClick={toggleModal} />
    </>
  );
}
