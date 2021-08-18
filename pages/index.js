import React from 'react';
import firebase from './config/firebase';
import { useForm, Controller } from 'react-hook-form';

import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';

export default function Home() {
  const { handleSubmit, register, watch, formState: { errors }, control } = useForm();

  const watchIsLearning = watch('isLearning');
  const watchWasLearning = watch('wasLearning');
  //const db = firebase.firestore()

  const onSubmit = (data) => {
    console.log(data.name)
    firebase.firestore().collection('questionnaire').add({
      user: data.name,
      birth: data.birth,
      isLearning: data.isLearning,
      wasLearning: data.wasLearning,
      program: data.program
    })
    }

  return (
    <>
      <Container>
          <h1>プログラミング学習に関するアンケート</h1>

          <form onSubmit={handleSubmit(onSubmit)} >
            <div>
              <label htmlFor='name'>Q1. 名前を入力してください(匿名可)</label>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
              />
            </div>

            <div>
              <label htmlFor='birth'>Q2. 生年月日を入力してください(例：19900527)</label>
              <Controller
                name="birth"
                defaultValue=""
                control={control}
                rules={{ required: true, pattern: /^[0-9]{8}$/ }}
                render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
              />
              {
                errors.birth && errors.birth.type === 'required' ?
                  <span className='errorMessage'>*このフォームは回答必須です。</span> : null
              }
              {
                errors.birth && errors.birth.type === 'pattern' ?
                  <span className='errorMessage'>*8桁の整数で入力してください。</span> : null
              }
            </div>

            <div>
              <span>Q3. 現在、プログラミングを学習していますか？</span>
              <input
                type="radio"
                id="isLearning1"
                name="isLearning"
                value="true"
                {...register('isLearning', { required: true })}
              />
              <label htmlFor="isLearning1">はい</label>

              <input
                type="radio"
                id="isLearning2"
                name="isLearning"
                value="false"
                {...register('isLearning', { required: true })}
              />
              <label htmlFor="isLearning2">いいえ</label>

              <input
                type="radio"
                id="isLearning3"
                name="isLearning"
                value="neither"
                {...register('isLearning', { required: true })}
              />
              <label htmlFor="isLearning3">わからない</label>
              {
                errors.isLearning &&
                <span className='errorMessage'>*このフォームは回答必須です。</span>
              }
            </div>

            <div>
              <span>Q4. これまでに、プログラミングを学習したことがありますか？</span>
              <input
                type="radio"
                id="wasLearning1"
                name="wasLearning"
                value="true"
                {...register('wasLearning', { required: true })}
              />
              <label htmlFor="wasLearning1">はい</label>


              <input
                type="radio"
                id="wasLearning2"
                name="wasLearning"
                value="false"
                {...register('wasLearning', { required: true })}
              />
              <label htmlFor="wasLearning2">いいえ</label>


              <input
                type="radio"
                id="wasLearning3"
                name="wasLearning"
                value="neither"
                {...register('wasLearning', { required: true })}
              />
              <label htmlFor="wasLearning3">わからない</label>
              {
                errors.wasLearning &&
                <span className='errorMessage'>*このフォームは回答必須です。</span>
              }
            </div>

            {
              watchIsLearning === 'true' || watchWasLearning === 'true' ?
                <div id='program'>
                  <label htmlFor='program'>Q5.今まで学習したことのあるプログラミング言語をすべて教えてください。</label>
                  <Controller
                    name="program"
                    defaultValue=""
                    control={control}
                    render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
                  />
                </div> : null
            }
            <input type='submit' value='アンケートを提出する' />
          </form>
      </Container>

    </>
  )
}
