import { Container } from '@/components/Container';
import { NextPage } from 'next'
import Link from 'next/link';

interface Props { }

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight sm:text-2xl text-zinc-100 my-5">{title}</h2>
            {children}
        </>
    );
}

const linkClass = "text-teal-400 hover:underline";

const PrivacyPage: NextPage<Props> = ({ }) => {
    return (
        <Container className="mt-9">
            <h1 className="text-3xl font-bold tracking-tight sm:text-3xl text-zinc-400">Privacy</h1>
            <div className="space-y-4">
                <p className="mt-5">
                    Short version: no accounts, no cookies, no analytics, no tracking. This page lists everything that is
                    processed anyway, for this website and for the services under indietasten.net.
                </p>

                <Section title="Who is responsible">
                    <p>
                        The person named in the <Link className={linkClass} href="/legal">legal notice</Link>. Contact them there for
                        any question about your data.
                    </p>
                </Section>

                <Section title="This website">
                    <p>
                        indietasten.net and the other sites under it (such as b0tnet, breadstone and necessity-screening) are static
                        websites served from a private server in Germany. To deliver the pages, your IP address and the request are
                        processed in memory only; no access logs are kept.
                    </p>
                    <p>
                        Connections to every service under indietasten.net pass through a relay server at DigitalOcean, LLC (USA) in its
                        Frankfurt, Germany data center. The relay only forwards the encrypted connection: it can&apos;t read the content,
                        sees your IP address only to pass the connection on, and keeps no logs. See the{' '}
                        <a className={linkClass} href="https://www.digitalocean.com/legal/privacy-policy" target="_blank" rel="noopener">DigitalOcean privacy policy</a>.
                    </p>
                    <p>
                        The project previews on the Projects page are loaded from GitHub (opengraph.githubassets.com, GitHub, Inc., USA),
                        which receives your IP address; see the{' '}
                        <a className={linkClass} href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub privacy statement</a>.
                    </p>
                    <p>
                        Fonts are served from this website itself, not from Google. There are no cookies, no analytics and no
                        embedded content from other providers.
                    </p>
                </Section>

                <Section title="Tile Router (tile-router.indietasten.net)">
                    <p>
                        Tile Router runs on a private server in Germany, reached through the relay described above. It has no accounts
                        and stores nothing about you on the server.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong className="text-zinc-200">Planning a route:</strong> your browser sends the start and end point, the
                            selected tiles and your settings, including a custom profile if you made one. The server computes the
                            route, sends it back (with progress updates while it works) and does not store the request or the
                            profile. The road overlay works the same way with the visible map area.
                        </li>
                        <li>
                            <strong className="text-zinc-200">Abuse protection and fair queue:</strong> the server counts route requests per
                            IP address in memory for a few minutes. While your route request waits for its turn or is being computed, your IP
                            address is also kept in memory to share the server fairly between users, and dropped as soon as the request ends.
                            None of this is written to disk, and no access logs with IP addresses are kept.
                        </li>
                        <li>
                            <strong className="text-zinc-200">Stored in your browser:</strong> settings (including the chosen level of
                            detail), selected tiles, start and end point, map view, your custom profiles and the link to your collected
                            squadrats are kept in your browser&apos;s local storage, only so the app remembers them. Clear the site data to remove them.
                        </li>
                        <li>
                            <strong className="text-zinc-200">Your collected squadrats:</strong> your browser loads them directly from
                            squadrats.org (or, if you enter a user id, from mainframe-api.squadrats.com). Uploaded files are read in your
                            browser and never uploaded. The Tile Router server never sees the link, the id, the file or your tiles.
                        </li>
                        <li>
                            <strong className="text-zinc-200">Map:</strong> the background map is loaded from{' '}
                            <a className={linkClass} href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a>, which
                            receives your IP address like any website your browser loads content from.
                        </li>
                        <li>
                            <strong className="text-zinc-200">Browser extension:</strong> on squadrats.com it looks for your public trophies
                            link and stores it in the extension&apos;s own storage on your device. It hands the link only to the Tile Router
                            page. It never reads your password, session or any other data on squadrats.com.
                        </li>
                    </ul>
                </Section>

                <Section title="Legal basis">
                    <p>
                        Delivering these services and protecting them against abuse is a legitimate interest (Art. 6(1)(f) GDPR).
                        Local storage is only used for functions you ask for, so no consent is needed (§ 25(2) no. 2 TDDDG).
                    </p>
                </Section>

                <Section title="Your rights">
                    <p>
                        You have the right to access, rectification, erasure, restriction of processing and objection (Art. 15–18
                        and 21 GDPR). You can also complain to a data protection authority, for example the Landesbeauftragte für den
                        Datenschutz Niedersachsen.
                    </p>
                </Section>

                <p className="text-sm text-zinc-500 pt-4">Last updated: October 13, 2026</p>
            </div>
        </Container>);
}

export default PrivacyPage
