import FAQ from '../home/components/FAQ'

const FaqPage = () => {
  const faqItems = [
    {
      id: '1',
      title: 'What makes Origin UI different?',
      content:
        'Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.',
    },
    {
      id: '2',
      title: 'How can I customize the components?',
      content:
        'Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.',
    },
    {
      id: '3',
      title: 'Is Origin UI optimized for performance?',
      content:
        'Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.',
    },
    {
      id: '4',
      title: 'How accessible are the components?',
      content:
        'All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.',
    },
  ]
  return (
    <div>
      <section className="flex flex-col px-4 py-16 gap-y-6 mx-auto max-w-[60rem]">
        <FAQ items={faqItems} />
      </section>
    </div>
  )
}

export default FaqPage
