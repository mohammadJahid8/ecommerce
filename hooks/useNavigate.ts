"use client"
import { useRouter } from 'next13-progressbar';

export const useNavigate = () => {
    const router = useRouter();

    const onNavigate = () => {
        router.push("/");
    }
    return {
        onNavigate
    }
}