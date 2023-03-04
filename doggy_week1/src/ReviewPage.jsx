import { Form, Input, Button } from "antd";
import axios from "axios";
import { useState } from "react";

const { TextArea } = Input;

const ReviewPage = () => {
    const [error, setError] = useState();
    const [isSending, setIsSending] = useState(false);
    const [successfullMessage, setSuccessfulMessage] = useState();

    const onFinish = async (values) => {
        setError(null);
        setSuccessfulMessage();
        setIsSending(true);
        try {
            const resp = await axios.post('https://localhost:7018/mail/send', {
                to: values.to,
                subject: values.subject,
                message: values.message
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (resp.status != 202) {
                throw Error("Mail was not sended. Check your data or try again later.");
            }
            setSuccessfulMessage("Your email was delivered!");
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setIsSending(false);
        }
    };
    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 10 }}>
            <Form
                name="review"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    width: "100%",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name={'to'}
                    label="Email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please, fill this in.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={'subject'}
                    label="Subject"
                    rules={[
                        {
                            required: true,
                            message: 'Enter your message subject.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={'message'}
                    label="Messsage body"
                    rules={[
                        {
                            required: true,
                            message: 'Enter your message body.'
                        }
                    ]}
                >
                    <TextArea rows={6} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={isSending}>
                        Send
                    </Button>
                </Form.Item>
            </Form>
            {error == null ? successfullMessage : error}
        </div>
    )
}

export default ReviewPage;