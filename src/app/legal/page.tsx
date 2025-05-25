import { Container } from '@/components/Container';
import { NextPage } from 'next'

interface Props { }

const LegalPage: NextPage<Props> = ({ }) => {
    return (
        <Container className="mt-9">
            <h1 className="text-3xl font-bold tracking-tight sm:text-3xl text-zinc-400">The boring stuff</h1>
            <h2 className="text-2xl font-bold tracking-tight sm:text-2xl text-zinc-100 my-5">3rd party links</h2>
            <p>
                This website contains links to third party websites and services for the convenience of the user. InDieTasten.net does not control these websites and has no association to the providers of these websites. If any such services or websites linked cause any harm or damages, the authors of InDieTasten.net are not liable. If users of InDieTasten follow these external links, they do so at their own risk.
            </p>
        </Container>);
}

export default LegalPage