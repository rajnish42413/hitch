import React, { Dispatch, useState } from 'react';
import { Form, Button, message } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import College from '../../../components/form/College';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import { IUser } from '../../../schemas/IUser';
import { connect } from 'react-redux';
import Axios from 'axios';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const ProfileEducation = (props: any) => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const history = useHistory();

  const onFinish = (values: any) => {
    const { educations } = values;
    if (!educations?.length) {
      message.error('Add atleast one eduction detail , to proceed futher');
      return;
    }
    handleSubmit(educations);
    return;
  };

  const handleSubmit = async (values: any) => {
    setBtnLoading(true);
    let show = message.loading('Saving ...', 0);
    try {
      await Axios.post('profile/educations', { educations: values });
      setTimeout(show, 0);
      setBtnLoading(false);
      form.resetFields();
      message.success('Profile updated successfully');
      history.push('/user/create/well-done');
    } catch (error) {
      setTimeout(show, 0);
      if (error.response?.data?.errors) {
        const { educations } = error.response.data.errors;
        if (educations) message.warning(educations[0]);
      }
      setBtnLoading(false);
    }
  };

  return (
    <AuthLayout header={true}>
      <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.List name="educations">
          {(fields, { add, remove }) => {
            return (
              <div style={{ marginBottom: '5rem' }}>
                {fields.map((field, index: number) => (
                  <div
                    style={{ padding: '1rem', border: '1px dotted #fff', marginBottom: '2rem' }}
                    key={index}
                  >
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                    <College field={field} />
                  </div>
                ))}

                <Form.Item>
                  <button
                    onClick={() => {
                      add(1);
                    }}
                    type="button"
                    className="btn-dark-text"
                    style={{ textAlign: 'left' }}
                  >
                    <PlusCircleOutlined />
                    {'  '} Add College
                  </button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <AuthFooter>
          <Button htmlType="submit" block className="btn-dark" loading={btnLoading}>
            Continue
          </Button>
        </AuthFooter>
      </Form>
    </AuthLayout>
  );
};

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setUser: (data: IUser) => dipatch(SetUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEducation);
