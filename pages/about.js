import Page from "../components/Page/Page";
import Title from "../components/Page/Title";
import PrettyLink from "../components/Common/PrettyLink";
import { useRouter } from "next/router";
import { getTranslation } from "../lib/locales";

export default function About({}) {
  const router = useRouter();
  const tr = getTranslation(router);
  const page = router.asPath.substring(1);
  return (
    <Page>
      <section className='container max-w-screen-lg'>
        <div className='container mx-auto'>
          <Title
            title={tr.taglines[page].title}
            description={tr.taglines[page].description}
          />
          <div className='my-16 flex-row space-y-6 rounded-xl bg-me-inverted p-8 text-lg text-me-base shadow-md shadow-me-light'>
            <p>
              Welcome to the <em>GIKI Science Society</em> website! I&apos;m <em>Bilal Ahmad</em>, 
              and I&apos;m passionate about bringing science and technology to our university community 
              through this platform. This site serves as a hub for all our scientific activities, 
              events, and resources at Ghulam Ishaq Khan Institute.
            </p>
            <p>
              Our Science Society is dedicated to fostering scientific curiosity, promoting 
              research culture, and creating opportunities for students to explore various 
              fields of science and technology. Whether you&apos;re interested in physics, chemistry, 
              biology, computer science, or engineering, you&apos;ll find something here that sparks 
              your interest.
            </p>
            <p>
              If you have any suggestions, want to contribute to our initiatives, or simply 
              want to connect, feel free to reach out to us. Together, we&apos;re building a 
              vibrant scientific community at GIKI that encourages innovation, collaboration, 
              and academic excellence.
            </p>
            <hr />
            <p>Join us in our mission to advance science and technology at GIKI.</p>
            <p>Explore. Discover. Innovate.</p>
          </div>
        </div>
      </section>
    </Page>
  );
}
