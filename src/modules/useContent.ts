import content from '@/content.json';

const useContent = () => {
  const getCards = (category: number) => content[category].cards;
  return {
    getCards,
  };
};

export default useContent;
