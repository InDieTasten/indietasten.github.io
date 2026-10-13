import { Container } from '@/components/Container';
import { NextPage } from 'next'
import Link from 'next/link';

interface Props { }

const LegalPage: NextPage<Props> = ({ }) => {
    return (
        <Container className="mt-9">
            <h1 className="text-3xl font-bold tracking-tight sm:text-3xl text-zinc-400">The boring stuff</h1>
            <h2 className="text-2xl font-bold tracking-tight sm:text-2xl text-zinc-100 my-5">Responsible for the content of this website</h2>
            <p className="select-none pointer-events-none">
                Ma<span>x Bü</span>cker<br />
                Hüg<span>gelst</span>raße 2<br />
                4<span>9205 Hasbe</span>rgen<br />
                Germany<br />
                Earth<br />
                Solar System<br />
                Milky Way
            </p>
            <p className="select-none pointer-events-none">
                Contact: 𝗶𝗻𝗱𝗶𝗲𝘁𝗮𝘀𝘁𝗲𝗻@𝗴𝗺𝗮𝗶𝗹.𝗰𝗼𝗺
            </p>
            <p className="mt-5">
                This legal notice also applies to the services under indietasten.net, for example{' '}
                <a className="text-teal-400 hover:underline" href="https://tile-router.indietasten.net">Tile Router</a>.
                How data is handled is described in the <Link className="text-teal-400 hover:underline" href="/privacy">privacy policy</Link>.
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-2xl text-zinc-100 my-5">3rd party links</h2>
            <p>
                This website contains links to third party websites and services for the convenience of the user. InDieTasten.net does not control these websites and has no association to the providers of these websites. If any such services or websites linked cause any harm or damages, the authors of InDieTasten.net are not liable. If users of InDieTasten follow these external links, they do so at their own risk.
            </p>
        </Container>);
}

export default LegalPage