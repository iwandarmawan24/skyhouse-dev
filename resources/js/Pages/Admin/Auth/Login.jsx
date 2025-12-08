import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/Card";
import { Alert, AlertDescription } from "@/Components/ui/Alert";
import { Checkbox } from "@/Components/ui/checkbox";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post("/admin/login");
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8 space-y-2">
                    <div className="inline-flex items-center justify-center mb-4">
                        <img
                            src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
                            alt="SkyHouse Property Logo"
                            className="h-20 w-auto"
                        />
                    </div>
                </div>

                {/* Login Card */}
                <Card className="border-0 shadow-2xl shadow-black/50">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            Welcome back
                        </CardTitle>
                        <CardDescription>
                            Enter your credentials to access the admin panel
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Error Alert */}
                            {hasErrors && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertDescription>
                                        {errors.email ||
                                            errors.password ||
                                            "Please check your credentials and try again."}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className={`pl-10 ${
                                            errors.email
                                                ? "border-destructive"
                                                : ""
                                        }`}
                                        placeholder="admin@skyhouse.com"
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className={`pl-10 pr-10 ${
                                            errors.password
                                                ? "border-destructive"
                                                : ""
                                        }`}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">
                                            {showPassword
                                                ? "Hide password"
                                                : "Show password"}
                                        </span>
                                    </Button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) =>
                                        setData("remember", checked)
                                    }
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me for 30 days
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in to Dashboard"
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        {/* Divider */}
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Demo Credentials
                                </span>
                            </div>
                        </div>

                        {/* Demo Credentials */}
                        <div className="rounded-lg bg-muted/50 p-3 text-center space-y-1">
                            <p className="text-xs text-muted-foreground">
                                Use these credentials to login:
                            </p>
                            <div className="flex items-center justify-center gap-4 text-xs font-mono">
                                <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    <span className="font-medium">
                                        admin@skyhouse.com
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Lock className="h-3 w-3" />
                                    <span className="font-medium">
                                        password
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                {/* Copyright Footer */}
                <p className="text-center text-xs text-white/60 mt-8">
                    &copy; {new Date().getFullYear()} SkyHouse Property. All
                    rights reserved.
                </p>
            </div>
        </div>
    );
}
