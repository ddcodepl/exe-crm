import Head from "next/head";
import {MainView} from "@/components/MainView";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {CancelButton, SubmitButton} from "@/components/Button";
import {Form, Input, Label, Span, Error} from "@/components/Form";
import {emailRegex} from "@/utils/forms";
import Row from "@/components/Row";
import {FormValues} from "@/types/forms";
import {apiUrl} from "@/utils/api";

const AddUser = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async(data: FormValues) => {
        fetch(`${apiUrl}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 500) {
                    alert(data.message)
                } else {
                    router.push('/home')
                }
            })
            .catch((err) => alert(err));
    }

    const handleCancel = () => {
        router.push('/home')
    }

    return (
        <>
            <Head>
                <title>ProExe CRM | Add new user</title>
                <meta name="description" content="ProExe Add new user"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="robots" content="noindex"/>
            </Head>
            <MainView>
                {/* Don't know how to handle it better */}
                <Form onSubmit={handleSubmit(onSubmit as any)}>
                    <Label>
                        <Span>Name:</Span>
                        <Input {...register("name", {required: true})} />
                        {errors.name && <Error>This field is required</Error>}
                    </Label>

                    <Label>
                        <Span>Username:</Span>
                        <Input {...register("username", {required: true})} />
                        {errors.username && <Error>This field is required</Error>}
                    </Label>

                    <Label>
                        <Span>Email:</Span>
                        <Input {...register("email", {
                            required: true,
                            pattern: emailRegex
                        })} />
                        {errors.email && <Error>Please enter a valid email</Error>}
                    </Label>

                    <Label>
                        <Span>City:</Span>
                        <Input {...register("city", {required: true})} />
                        {errors.city && <Error>This field is required</Error>}
                    </Label>

                    <Row>
                        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                        <SubmitButton type="submit">Submit</SubmitButton>
                    </Row>
                </Form>
            </MainView>
        </>
    )
    ;
};

export default AddUser;
