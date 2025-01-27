import { memo } from 'react';
import { FaPhone, FaEnvelope, FaLink, FaMapMarkerAlt } from 'react-icons/fa';

interface Props {
  data: any;
  color: string;
  colorClasses: Record<string, string>;
  bgColorClasses: Record<string, string>;
}

const SectionTitle = memo(({ children, color, colorClasses }: { children: React.ReactNode; color: string; colorClasses: Record<string, string> }) => (
  <h2 className={`text-2xl font-bold mb-4 ${colorClasses[color]}`}>{children}</h2>
));
SectionTitle.displayName = 'SectionTitle';

const ModernTemplate = ({ data: r, color, colorClasses, bgColorClasses }: Props) => {
  return (
    <div className="p-8 rounded shadow sm:text-sm md:text-md border border-gray-300 print:border-0 bg-white prose-sm" 
         style={{ width: '210mm', flex: '0 0 210mm', margin: '0 auto', minHeight: '297mm' }}>
      {/* Header Section */}
      <header className={`p-6 rounded-lg mb-6 ${bgColorClasses[color]} bg-opacity-10`}>
        <h1 className={`text-4xl font-bold mb-2 ${colorClasses[color]} break-words`}>
          {r?.personal?.firstName} {r?.personal?.lastName}
        </h1>
        <h2 className="text-xl text-gray-600 mb-4 break-words">{r?.employments?.[0]?.title}</h2>
        <p className="text-gray-600 mb-4 break-words whitespace-pre-wrap">{r?.personal?.summary}</p>
        
        <div className="flex flex-wrap gap-4 text-gray-600">
          {r?.personal?.phone && (
            <div className="flex items-center gap-2">
              <FaPhone className={colorClasses[color]} />
              <span>{r?.personal?.phone}</span>
            </div>
          )}
          {r?.personal?.email && (
            <div className="flex items-center gap-2">
              <FaEnvelope className={colorClasses[color]} />
              <span>{r?.personal?.email}</span>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-1">
          {/* Skills Section */}
          {r?.skills?.[0]?.name && (
            <section className="mb-6">
              <SectionTitle color={color} colorClasses={colorClasses}>Skills</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {r?.skills?.map((skill: any, i: number) => (
                  <span key={i} className={`px-3 py-1 rounded-full text-sm ${bgColorClasses[color]} text-white`}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Links Section */}
          {r?.links?.[0]?.name && (
            <section className="mb-6">
              <SectionTitle color={color} colorClasses={colorClasses}>Links</SectionTitle>
              <div className="space-y-2">
                {r?.links?.map((link: any, i: number) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <FaLink className={colorClasses[color]} />
                    {link.name}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {r?.educations?.[0]?.institution && (
            <section className="mb-6">
              <SectionTitle color={color} colorClasses={colorClasses}>Education</SectionTitle>
              <div className="space-y-4">
                {r?.educations?.map((edu: any, i: number) => (
                  <div key={i} className="border-l-2 pl-4 border-gray-200 [&_p]:my-1">
                    <h3 className="font-semibold text-gray-800 break-words">{edu.subject}</h3>
                    <p className="text-gray-600 break-words">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2">
          {/* Experience Section */}
          {r?.employments?.[0]?.title && (
            <section className="mb-6">
              <SectionTitle color={color} colorClasses={colorClasses}>Experience</SectionTitle>
              <div className="space-y-6">
                {r?.employments?.map((emp: any, i: number) => (
                  <div key={i} className={`p-4 rounded-lg border-l-4 ${bgColorClasses[color]} bg-opacity-5`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 mr-4">
                        <h3 className="font-semibold text-gray-800 break-words">{emp.title}</h3>
                        <p className="text-gray-600 break-words">{emp.company}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-gray-500 whitespace-nowrap">
                          {emp.startDate} - {emp.isCurrent ? 'Present' : emp.endDate}
                        </p>
                        {emp.location && (
                          <p className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                            <FaMapMarkerAlt />
                            <span className="break-words">{emp.location}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-600 prose prose-sm max-w-none [&_p]:my-0 [&_p]:break-words [&_span]:break-words" 
                         dangerouslySetInnerHTML={{ __html: emp.summary }} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {r?.courses?.[0]?.name && (
            <section className="mb-6">
              <SectionTitle color={color} colorClasses={colorClasses}>Certifications</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {r?.courses?.map((cert: any, i: number) => (
                  <div key={i} className="p-3 rounded-lg border border-gray-200 [&_p]:my-1">
                    <h3 className="font-semibold text-gray-800 break-words">{cert.name}</h3>
                    <p className="text-gray-600 break-words">{cert.institution}</p>
                    <p className="text-sm text-gray-500">
                      {cert.startDate} {cert.endDate && `- ${cert.endDate}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References Section */}
          {r?.references?.[0]?.name && (
            <section className="mb-6">
              <SectionTitle color={color} colorClasses={colorClasses}>References</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {r?.references?.map((ref: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-200 [&_p]:my-1">
                    <h3 className="font-semibold text-gray-800 break-words">{ref.name}</h3>
                    <p className="text-gray-600 break-words">{ref.company}</p>
                    {ref.phone && (
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaPhone /> {ref.phone}
                      </p>
                    )}
                    {ref.email && (
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaEnvelope /> {ref.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
