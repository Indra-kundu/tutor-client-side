"use client";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import toast from 'react-hot-toast';
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault();

        // HeroUI Form থেকে ডাটা বের করার সঠিক উপায়
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const image = formData.get("image");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log("Submitting:", { name, email, image, password }); // চেক করার জন্য কনসোল

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            image,
        });

        if (error) {
            toast.error(error.message || "Registration failed!");
        } else {
            toast.success("Account created successfully!");
            router.push('/');
        }
    };

    const handleGoogleSignUp = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: '/'
        });
        if (error) toast.error("Google Sign-Up failed!");
    };


    return (
        <Card className="border mx-auto w-125 py-10 my-15">
            <h1 className="text-center text-2xl font-bold">Sign Up</h1>

            <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
                <TextField isRequired name="name" type="text">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                    <FieldError />
                </TextField>

                <TextField isRequired name="image" type="text">
                    <Label>Image URL</Label>
                    <Input placeholder="Image URL" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }

                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>
                        Must be at least 8 characters with 1 uppercase and 1 number
                    </Description>
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Register
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>

            <div className="w-96 mx-auto mt-4 space-y-4">
                <div className="flex items-center gap-2">
                    <hr className="flex-1" /> <span>OR</span> <hr className="flex-1" />
                </div>

                <Button onClick={handleGoogleSignUp} className="w-full">
                    <FaGoogle /> Sign Up With Google
                </Button>

                <p className="text-center text-sm">
                    Already have an account? <Link href="/signin" className="text-blue-600 underline">Login here</Link>
                </p>
            </div>

        </Card>
    );
}