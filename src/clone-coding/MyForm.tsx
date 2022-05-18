import React, {useState} from 'react';
import {Button} from '@mui/material';
import SaveIcon from '@material-ui/icons/Save';

type MyFormProps = {
  onSubmit: (form: {name: string; description: string}) => void;
};

function MyForm({onSubmit}: MyFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  const {name, description} = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: '',
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* 커서를 onChange 에 올려보면 객체의 타입을 알 수 있음 */}
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <Button
        variant="outlined"
        type="submit"
        color="primary"
        startIcon={<SaveIcon />}
      >
        등록
      </Button>
    </form>
  );
}

export default MyForm;
