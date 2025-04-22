import Abonados from '@/Components/Abonados';
import Hero from '@/Components/Hero';
import NavBar from '@/Components/NavBar';
import Nosotros from '@/Components/Nosotros';
import Scouting from '@/Components/Scouting';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <NavBar />
            <Hero />
            <Scouting />
            <Abonados />
            <Nosotros />
        </>
    );
}
