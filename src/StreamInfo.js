import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const STREAM_INFO = {
  'PCMB (Physics, Chemistry, Mathematics, Biology)':
    'Balanced science stream for both engineering and medical paths, with strong preparation for NEET, KCET, and JEE-based higher studies.',
  'PCMC (Physics, Chemistry, Mathematics, Computer Science)':
    'Best for engineering and computing degrees, especially CSE, IT, AI, and data-focused courses through JEE/KCET and related exams.',
  'PCME (Physics, Chemistry, Mathematics, Electronics)':
    'Useful for electronics, electrical, and communication engineering programs with good base for circuit and hardware-oriented higher education.',
  'PCMS (Physics, Chemistry, Mathematics, Statistics)':
    'Strong foundation for engineering, statistics, actuarial science, and data analytics degrees that require advanced math skills.',
  'PCBZ (Physics, Chemistry, Biology, Biotechnology)':
    'Ideal for biotechnology, life sciences, microbiology, and allied health degrees with scope for research-oriented higher education.',
  'PCBH (Physics, Chemistry, Biology, Home Science)':
    'Suitable for nutrition, food science, clinical nutrition, and family resource management courses in higher education.',
  'PMCs (Physics, Mathematics, Computer Science, Statistics)':
    'Excellent for computer science, AI/ML, statistics, and data science degrees that need strong quantitative and programming basics.',
  'PCM (Physics, Chemistry, Mathematics)':
    'Core route to engineering, architecture, and pure science degrees with focus on math and problem-solving entrance preparation.',

  'CEBA (Computer Science, Economics, Business Studies, Accountancy)':
    'Commerce stream with tech exposure, useful for B.Com, BBA, BCA, fintech, and business analytics higher studies.',
  'SEBA (Statistics, Economics, Business Studies, Accountancy)':
    'Good for finance, economics, statistics, and commerce degrees, especially where analytical and accounting skills are important.',
  'HEBA (History, Economics, Business Studies, Accountancy)':
    'Blends social science and commerce, supporting higher studies in economics, management, commerce, and public policy fields.',
  'ABMS (Accountancy, Business Studies, Mathematics, Statistics)':
    'Strong quantitative commerce option for CA/CMA track, finance, actuarial science, and business analytics courses.',
  'ABEC (Accountancy, Business Studies, Economics, Computer Science)':
    'Best for modern commerce pathways such as B.Com, BBA, BCA, and economics with digital/business technology relevance.',
  'ABEM (Accountancy, Business Studies, Economics, Mathematics)':
    'Solid base for commerce, economics, banking, and finance degrees with stronger math support for competitive exams.',

  'HEPS (History, Economics, Political Science, Sociology)':
    'Useful for humanities and social science degrees, especially public administration, civil services preparation, and policy studies.',
  'HEPyS (History, Economics, Psychology, Sociology)':
    'Recommended for psychology, sociology, social work, and behavioral science higher-education pathways.',
  'HEGS (History, Economics, Geography, Sociology)':
    'Relevant for geography, development studies, social sciences, and planning-related degree options.',
  'HESP (History, Economics, Sociology, Psychology)':
    'Supports psychology, economics, sociology, and interdisciplinary humanities degrees with strong social analysis skills.',
  'HEPA (History, Economics, Political Science, Optional Language)':
    'Helpful for law, journalism, public policy, and language-linked humanities degrees.',
  'JESP (Journalism, Economics, Sociology, Political Science)':
    'Best for journalism, mass communication, media studies, and communication-related higher education.',
  'HSPsy (History, Sociology, Psychology, Optional Language)':
    'Strong route to psychology, counseling, social work, and humanities courses with language advantage.',
  'HEPE (History, Economics, Political Science, Education)':
    'Good preparation for BA+B.Ed pathways, teaching careers, education studies, and social science degrees.',

  'B.E / B.Tech (Engineering)':
    'Professional degree route for core and software engineering specializations through CET/JEE and institution-level admissions.',
  'MBBS / BDS / BAMS / BHMS':
    'Medical and healthcare degree pathways requiring NEET qualification, leading to doctor and clinical practice careers.',
  'B.Sc (Pure Science)':
    'Research-focused option in physics, chemistry, mathematics, or biology with progression to M.Sc and research careers.',
  'BCA (Computer Applications)':
    'Application-oriented computing degree that builds software, database, and web skills for IT careers and MCA progression.',
  'B.Pharm (Pharmacy)':
    'Pharmaceutical education path covering drug formulation, clinical pharmacy, and regulatory sectors with scope for M.Pharm.',
  'B.Arch (Architecture)':
    'Design and planning degree for architecture, requiring aptitude preparation and studio-based higher education learning.',
  'B.Com (Commerce)':
    'Foundational commerce degree for accounting, taxation, finance, and banking, with pathways to CA/CMA/CS and M.Com.',
  'BBA (Business Administration)':
    'Management-focused degree that develops business, operations, and leadership basics for MBA and corporate roles.',
  'BA (Arts and Humanities)':
    'Flexible humanities degree supporting careers and higher studies in social sciences, media, public service, and law.',
  'Integrated Courses (B.Sc + M.Sc / B.Tech + M.Tech)':
    'Long-term integrated pathway that combines UG and PG, useful for faster specialization and research/advanced technical careers.',
  'Law (5-Year Integrated LLB)':
    'Direct law track after 12th through integrated programs, preparing for litigation, corporate law, and legal services.',
  'Paramedical and Allied Health Courses':
    'Career-oriented healthcare programs in diagnostics, therapy, and clinical support with strong hospital-sector demand.',

  'B.Com (General / Honors)':
    'Commerce degree with strong base in accounting, taxation, and finance; Honors offers deeper specialization for higher studies.',
  'BMS (Management Studies)':
    'Management program focused on business operations, marketing, and strategy with good preparation for MBA.',
  'BBM (Business Management)':
    'Business-focused degree that builds managerial and entrepreneurial skills for industry roles and PG management courses.',
  'BA Economics':
    'Economics-centered degree suitable for policy, analytics, finance, and higher studies in economics and public administration.',
  'B.Com LLB (Integrated Law)':
    'Integrated commerce and law program ideal for corporate law, taxation law, compliance, and legal consulting careers.',
  'CA (Chartered Accountancy)':
    'Professional accounting qualification path with strong focus on audit, taxation, and financial reporting through CA exams.',
  'CS (Company Secretary)':
    'Professional course for corporate governance, compliance, and company law, leading to key legal-compliance roles.',
  'CMA (Cost and Management Accounting)':
    'Specialized professional route in cost control, management accounting, and strategic financial planning.',
  'Bachelor in Banking and Insurance':
    'Sector-specific degree for banking operations, insurance services, risk management, and financial services careers.',
  'Bachelor in Financial Markets':
    'Focused program in capital markets, investments, securities, and portfolio basics for finance and trading careers.',

  'BA (History / Political Science / Sociology / Psychology)':
    'Core arts degree combination for social sciences, civil services preparation, counseling, research, and public-sector careers.',
  'BA Journalism and Mass Communication':
    'Media and communication degree preparing for journalism, digital media, content, advertising, and public relations.',
  'BA English Literature':
    'Language and literature pathway useful for writing, teaching, content, publishing, and communication-heavy careers.',
  'BFA (Fine Arts)':
    'Creative degree for visual arts, painting, applied arts, and design-oriented higher education and portfolio careers.',
  'BPA (Performing Arts)':
    'Specialized pathway in music, dance, or theatre with professional training for performance and teaching careers.',
  'BSW (Bachelor of Social Work)':
    'Professional social service degree for NGO, community development, counseling support, and welfare-sector careers.',
  'B.Des (Design)':
    'Design-focused degree for UI/UX, product, fashion, and communication design with studio and portfolio-based learning.',
  'LLB (5-Year Integrated Law)':
    'Integrated legal education after 12th, suitable for litigation, judiciary preparation, and corporate legal roles.',
  'BHM (Hotel Management)':
    'Hospitality degree covering hotel operations, food service, and tourism management with global career scope.',
  'BTTM (Travel and Tourism Management)':
    'Tourism-focused degree for travel operations, destination planning, hospitality coordination, and tourism business roles.',
  'Diploma Courses in Animation / Media / Languages':
    'Short-term skill programs that provide practical training and faster entry into creative media or language-based careers.',

  'Civil Engineering':
    'Diploma stream focused on construction, surveying, and infrastructure basics with pathways to site roles or lateral B.E entry.',
  'Computer Science and Engineering':
    'Diploma track for programming and software fundamentals, enabling IT jobs and lateral entry into engineering.',
  'Electrical and Electronics Engineering':
    'Practical stream on electrical systems and electronics suitable for maintenance, industry roles, and higher technical education.',
  'Electronics and Communication Engineering':
    'Covers communication systems and embedded basics, useful for telecom/electronics jobs and lateral degree progression.',
  'Mechanical Engineering':
    'Core engineering diploma for machines, manufacturing, and maintenance with strong industry demand and lateral entry options.',
  'Information Technology':
    'Application-focused technical stream for networking, software support, and IT services with upgrade path to degree programs.',
  'Automobile Engineering':
    'Specialized stream in vehicle systems, service, and diagnostics with opportunities in automotive industry and higher studies.',
  Mechatronics:
    'Interdisciplinary diploma combining mechanical, electronics, and automation concepts for modern manufacturing careers.',
  'Architecture Assistantship':
    'Design and drafting-oriented diploma for building plans and CAD support, with scope in architecture and planning offices.',
  'Robotics and Automation':
    'Emerging technical stream for automation, control systems, and robotics applications in smart industry environments.',
  'Artificial Intelligence and Machine Learning':
    'Modern stream introducing AI/ML foundations, programming, and data applications for next-generation tech careers.',
  'B.E / B.Tech (Lateral Entry)':
    'Degree pathway after diploma through direct second-year entry, useful for advancing into engineering design, development, and supervisory roles.',
  'AMIE (Engineering Certification)':
    'Professional engineering certification option for diploma holders to gain degree-equivalent qualification with flexible study structure.',
  'B.Voc (Bachelor of Vocation)':
    'Skill-based degree focused on industry-ready practical training, suitable for technical job growth and specialized career tracks.',
  'Advanced Diploma / PG Diploma':
    'Specialized higher diploma route to deepen technical expertise in targeted domains such as automation, design, or manufacturing.',
  'Government Competitive Exams':
    'Preparation route for government technical and non-technical posts through PSU, SSC, railway, and state-level exams.',
  'Apprenticeship Programs':
    'Work-integrated training path that builds hands-on industry skills and often leads to full-time placement opportunities.',
  'Advanced ITI / CTS Courses':
    'Advanced trade-level training to upgrade skills in specific technical areas and improve employability in specialized roles.',
  'Diploma (Lateral Entry)':
    'Progression option from ITI to diploma through lateral entry, enabling access to higher technical education and broader job roles.',
  'Apprenticeship Training':
    'Structured on-the-job training with industry exposure, helping ITI students transition into permanent technical positions.',
  'NAC (National Apprenticeship Certificate)':
    'National certification validating apprenticeship skills and improving eligibility for organized-sector and government trade jobs.',
  'B.Voc (Skill-based Degree)':
    'Vocational degree track that combines theory with practical learning for technical and service-sector careers.',
  'Government Technical Exams':
    'Exam-based route for recruitment into public-sector technical roles including railways, defense, and state departments.',

  Electrician:
    'ITI trade for electrical wiring, installations, and maintenance with apprenticeship and strong employability in power and construction.',
  Fitter:
    'ITI mechanical trade focused on assembly, fitting, and maintenance of machines in manufacturing and plant operations.',
  Welder:
    'ITI skill trade for metal joining and fabrication used widely in construction, manufacturing, and industrial maintenance.',
  Turner:
    'ITI machining trade focused on lathe operations and precision component manufacturing in industrial workshops.',
  Machinist:
    'ITI trade for machine tool operations and part production, building core workshop and production-floor skills.',
  'Mechanic Diesel':
    'ITI trade for diesel engine diagnostics and repair used in transport, heavy equipment, and service centers.',
  'Mechanic Motor Vehicle (MMV)':
    'Automotive ITI trade for vehicle maintenance, troubleshooting, and service operations in workshops and dealerships.',
  'Mechanic Refrigeration and Air Conditioning':
    'ITI trade focused on cooling systems, AC installation, and servicing for residential and commercial sectors.',
  Wireman:
    'Electrical trade specializing in wiring systems, connections, and safety practices for homes and industries.',
  'Electronics Mechanic':
    'ITI trade for electronic equipment testing, repair, and maintenance in service and production environments.',
  Plumber:
    'Trade-based program for piping, fittings, and water systems with steady demand in construction and maintenance.',
  'Draughtsman Civil':
    'Drafting trade for civil drawings and plans using manual/CAD methods, supporting engineering and construction projects.',
  'Draughtsman Mechanical':
    'Technical drafting trade for machine/component drawings and CAD documentation in manufacturing industries.',
  'COPA (Computer Operator and Programming Assistant)':
    'Computer-focused ITI trade covering office tools, basic coding, and IT support skills for entry-level tech roles.',
  'Tool and Die Maker':
    'High-precision ITI trade for designing and making tools, dies, and molds used in manufacturing production.',
  Surveyor:
    'Field-oriented trade for land measurement and mapping with opportunities in civil projects and infrastructure work.',
  'Sewing Technology':
    'Skill stream for garment construction, stitching, and apparel production with options in industry or self-employment.'
};

const getInfo = (streamName) => {
  if (!streamName) {
    return 'Select a stream to view details.';
  }

  if (STREAM_INFO[streamName]) {
    return STREAM_INFO[streamName];
  }

  const lower = streamName.toLowerCase();

  if (lower.includes('pcmb') || lower.includes('biology') || lower.includes('medical')) {
    return 'Best for students interested in medicine, life sciences, biotechnology, nursing, and health-related degree courses.';
  }
  if (lower.includes('pcmc') || lower.includes('computer') || lower.includes('information technology')) {
    return 'Strong path for computer science, software engineering, IT, data science, and technology-focused degrees.';
  }
  if (lower.includes('commerce') || lower.includes('accountancy') || lower.includes('business') || lower.includes('economics')) {
    return 'Good choice for CA, CS, B.Com, BBA, banking, finance, business management, and entrepreneurship.';
  }
  if (lower.includes('arts') || lower.includes('history') || lower.includes('sociology') || lower.includes('political')) {
    return 'Supports careers in civil services, law, psychology, journalism, social sciences, and humanities.';
  }
  if (lower.includes('engineering') || lower.includes('mechanical') || lower.includes('civil') || lower.includes('electrical')) {
    return 'Technical stream with strong opportunities in core engineering, design, manufacturing, and project roles.';
  }
  if (lower.includes('electrician') || lower.includes('fitter') || lower.includes('welder') || lower.includes('machinist')) {
    return 'Skill-based trade stream with direct practical training, apprenticeships, and fast entry to technical jobs.';
  }

  return 'This stream gives subject-specific preparation and helps you choose the right higher-education course based on your selected combination.';
};

const StreamInfo = ({ setCurrentPage }) => {
  const streamName = localStorage.getItem('selectedStreamName') || '';
  const backPage = localStorage.getItem('selectedStreamBackPage') || 'career-explore';
  const showRelatedJobs =
    backPage === 'after-pu12th-education' ||
    backPage === 'after-pu12th-commerce' ||
    backPage === 'after-pu12th-arts' ||
    backPage === 'after-diploma-education' ||
    backPage === 'after-iti-education';

  const openRelatedJobs = () => {
    const relatedJobsPageByBackPage = {
      'after-pu12th-education': 'jobs-after-pu12th-education',
      'after-pu12th-commerce': 'jobs-after-pu12th-education',
      'after-pu12th-arts': 'jobs-after-pu12th-education',
      'after-diploma-education': 'jobs-after-diploma-education',
      'after-iti-education': 'jobs-after-iti-education'
    };
    localStorage.setItem('preferredJobGroup', streamName);
    localStorage.setItem('selectedJobsBackPage', backPage);
    setCurrentPage(relatedJobsPageByBackPage[backPage] || 'jobs');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>{streamName || 'Stream Details'}</h1>
          <p>{getInfo(streamName)}</p>
          <div className="page-nav-buttons">
            {showRelatedJobs && (
              <button className="page-next-btn" onClick={openRelatedJobs}>
                Related Jobs
              </button>
            )}
            <button className="page-back-btn" onClick={() => setCurrentPage(backPage)}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StreamInfo;
