import { memo } from 'react';

interface Props {
  data: any;
  color: string;
  colorClasses: Record<string, string>;
  bgColorClasses: Record<string, string>;
}

const SectionTitle = memo(({ children, color }: { children: React.ReactNode; color: string }) => (
  <h2 className={`text-2xl font-bold ${color}`}>{children}</h2>
));
SectionTitle.displayName = 'SectionTitle';

const CompanyHeader = memo(({ title, company, location }: { title: string; company: string; location: string }) => (
  <div className="flex flex-row mt-8">
    <div className="flex-auto">
      <h3 className="text-xl font-bold text-gray-600">{title}</h3>
      <h4 className="text-lg">{company}</h4>
      <h4 className="text-lg">{location}</h4>
    </div>
  </div>
));
CompanyHeader.displayName = 'CompanyHeader';

const DateRange = memo(({ startDate, endDate, isCurrent }: { startDate: string; endDate: string; isCurrent?: boolean }) => (
  <div className="flex-2">
    <h3 className="">
      {startDate} to {isCurrent ? 'Present' : endDate}
    </h3>
  </div>
));
DateRange.displayName = 'DateRange';

const DefaultTemplate = ({ data: r, color, colorClasses, bgColorClasses }: Props) => {
  return (
    <div className="p-4 rounded shadow sm:text-sm md:text-md border border-gray-300 print:border-0" 
         style={{ width: '210mm', flex: '0 0 210mm', margin: '0 auto', minHeight: '297mm' }}>
      <div className="flex flex-col h-full">
        <header className="py-2">
          <h1 className={`text-4xl uppercase truncate ${colorClasses[color]}`}>
            {r?.personal?.firstName + " " + r?.personal?.lastName}
          </h1>
          <span className="text-lg text-gray-500 truncate">
            {r?.employments?.[0]?.title}
          </span>
        </header>

        <hr className="my-2"></hr>

        <div className="flex flex-1 gap-4">
          <div className="w-1/4 shrink-0 [&_p]:break-all [&_span]:break-all">
            {/* Side Content */}
            <section className="py-4">
              <SectionTitle color={colorClasses[color]}>Details</SectionTitle>
              <div className="mt-4">
                <h3 className="text-lg uppercase">Phone</h3>
                <p className="mt-1 text-gray-500"> {r?.personal?.phone} </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg uppercase">Email</h3>
                <p className="mt-1 text-gray-500"> {r?.personal?.email} </p>
              </div>
            </section>

            {r?.links?.[0]?.name && (
              <section className="py-4">
                <SectionTitle color={colorClasses[color]}>LINKS</SectionTitle>
                {r?.links?.map((v: any, i: number) => (
                  <div className="mt-4" key={i}>
                    <p className="mt-1 text-gray-500">
                      <a href={v?.url} target="_blank" rel="noopener noreferrer">
                        {v?.name}
                      </a>
                    </p>
                  </div>
                ))}
              </section>
            )}

            {r?.skills?.[0]?.name && (
              <section className="py-4">
                <SectionTitle color={colorClasses[color]}>SKILLS</SectionTitle>
                {r?.skills?.map((v: any, i: number) => (
                  <div className="mt-4" key={i}>
                    <div className={`badge ${bgColorClasses[color]} text-white`}>
                      {v?.name}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Divider */}
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <div></div>
            <div></div>
          </div>

          <div className="flex-1 min-w-0 [&_p]:break-all [&_span]:break-all">
            {/* Main Content */}
            <section className="py-4">
              <SectionTitle color={colorClasses[color]}>Profile</SectionTitle>
              <p className="mt-4 text-gray-500">{r?.personal?.summary}</p>
            </section>

            {r?.internships?.[0]?.title && (
              <section className="py-4">
                <SectionTitle color={colorClasses[color]}>Internships</SectionTitle>
                {r?.internships?.map((v: any, i: number) => (
                  <article className="" key={i}>
                    <CompanyHeader title={v.title} company={v.company} location={v.location} />
                    <DateRange startDate={v.startDate} endDate={v.endDate} />
                    <p className="mt-4 text-gray-500">{v?.summary}</p>
                  </article>
                ))}
              </section>
            )}

            {r?.employments?.[0]?.title && (
              <section className="py-4">
                <SectionTitle color={colorClasses[color]}>Employment History</SectionTitle>
                {r?.employments?.map((v: any, i: number) => (
                  <article className="" key={i}>
                    <CompanyHeader title={v.title} company={v.company} location={v.location} />
                    <DateRange startDate={v.startDate} endDate={v.endDate} isCurrent={v.isCurrent} />
                    <p className="mt-4 text-gray-500">{v?.summary}</p>
                  </article>
                ))}
              </section>
            )}

            {r?.educations?.[0]?.institution && (
              <section className="py-4">
                <SectionTitle color={colorClasses[color]}>Education</SectionTitle>
                {r?.educations?.map((v: any, i: number) => (
                  <article className="" key={i}>
                    <div className="flex flex-row mt-8">
                      <div className="flex-auto">
                        <h3 className="text-xl font-bold text-gray-600">
                          {v?.subject}
                        </h3>
                        <h4 className="text-lg">{v?.institution}</h4>
                      </div>
                      <div className="flex-2">
                        <h3 className="">
                          {v?.startDate} to {v?.endDate}
                        </h3>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}

            {r?.courses?.[0]?.name && (
              <section className="py-4">
                <SectionTitle color={colorClasses[color]}>Certification</SectionTitle>
                {r?.courses?.map((v: any, i: number) => (
                  <article className="mb-8" key={i}>
                    <div className="flex flex-row mt-4">
                      <div className="flex-auto">
                        <h3 className="text-xl font-bold text-gray-600">
                          {v?.name}
                        </h3>
                      </div>
                      <div className="flex-2">
                        <h3 className="">{v?.institution}</h3>
                      </div>
                    </div>
                    <h4 className="mt-2">
                      {v?.startDate}{" "}
                      {v?.startDate ? "to " + v?.startDate : ""}
                    </h4>
                  </article>
                ))}
              </section>
            )}

            {r?.references?.[0]?.name && (
              <section className="py-4">
                <SectionTitle color={colorClasses[color]}>References</SectionTitle>
                {r?.references?.map((v: any, i: number) => (
                  <article className="" key={i}>
                    <div className="flex flex-row mt-8">
                      <div className="flex-auto">
                        <h3 className="text-xl font-bold text-gray-600">
                          {v?.company}
                        </h3>
                        {v?.phone && (
                          <p className="text-lg">Phone: {v.phone}</p>
                        )}
                        {v?.email && (
                          <p className="text-lg">Email: {v.email}</p>
                        )}
                      </div>
                      <div className="flex-2">
                        <h3 className="">{v?.name}</h3>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultTemplate;
