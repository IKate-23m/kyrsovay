import React, { useState, useRef, useEffect } from 'react';
import { usePopper } from 'react-popper';
import imageUrls from './image';
interface Character {
  id: number;
  name: string;
  power: string;
  photo: string;
}

function CharacterTable() {
  const characters: Character[] = [
    { id: 1, name: 'Агни', power: 'Брахман, он отказался от своего старого образа жизни и стал дворецким Сомы Асман Кадара, которого очень уважает.', photo: imageUrls[0] },
    { id: 2, name: 'Алоис Транси (Джим Маккен)', power: 'Персонаж аниме Kuroshitsuji II, является главой семьи Транси. Его настоящее имя — Джим Маккен.', photo: imageUrls[1] },
    { id: 3, name: 'Анжела Блан (Эш Ландерс)', power: 'Ангел, в женском воплощении вступает в сюжет в качестве горничной Генри Бэрримора, в мужском — дворецкий и помощник Королевы Виктории, заменяет отсутствующих в аниме Чарльза Грея, Джона Брауна и Чарльза Фиппса. В манге отсутствует.', photo:imageUrls[2]  },
    { id: 4, name: 'Бардрой (Бард)', power: 'Шеф-повар дома Фантомхайв.', photo: imageUrls[3] },
    { id: 5, name: 'Бист (Мэлли)', power:'Входит в основной состав цирка "Ноев Ковчег", специализируется на укрощении животных, а именно — тигров и львов. Настоящее имя — Мэлли, дочь горничной Амелии. Также известна как «звезда шоу».',photo: imageUrls[4] },
    { id: 6, name: 'Блават Скай', power: 'Предсказатель из театра-варьете Сфера. Гадает по капле крови о судьбе и "небесных опекунах".', photo: imageUrls[5] },
    { id: 7, name: 'Герман Гринхилл', power: 'Был одним из "Р4" ("Четвёрки префектов"), умён, благороден, строг к себе и окружающим, чрезвычайно консервативен.', photo: imageUrls[6] },
    { id: 8, name: 'Грегорий Вайолет', power: 'Бывший студент Уэстонского Колледжа. Был одним из "Р4" ("Четвёрки префектов") и главой общежития Фиолетовый Волк.', photo:imageUrls[7]  },
    { id: 9, name: 'Грелль Сатклифф', power: 'Жнец, первоначально притворявшийся дворецким Анджелины Даллес и совершавший вместе с ней убийства в качестве Джека Потрошителя. Он является сотрудником Отдела Диспетчерского Управления, где одной из его главных задач является сбор душ.', photo: imageUrls[8] },
    { id: 10, name: 'Гробовщик', power:'Жнец и директор похоронного бюро, который работает с преступным миром Великобритании. Он часто выступает в качестве информатора семьи Фантомхайв, с которой знаком со времен Винсента Фантомхайв.',photo: imageUrls[9] },
  { id: 11, name: 'Джокер', power: 'Входит в основной состав, является импресарио и жонглёром цирка Ноев Ковчег. Руководит шоу во время представлений. Во время проживания в поместье барона Кельвина Джокер служил ему в качестве дворецкого.', photo: imageUrls[10] },
    { id: 12, name: 'Долл', power: 'Входит в основной состав цирка Ноев Ковчег, занимающая там должность канатоходца. Изначально была представлена как «Принцесса цирка, бросающая вызов смерти хождением по канату».', photo: imageUrls[11] },
    { id: 13, name: 'Зеглинде Салливан', power: 'Хозяйка Леса Ведьмы. Управляла глухой деревушкой «Волчье ущелье», которая находится в этом лесу. Жительницы деревни относятся к ней как к «Мастеру».', photo:imageUrls[12]  },
    { id: 14, name: 'Клод Фаустус', power: 'Демон-дворецкий дома Транси. Он является основным антагонистом аниме Kuroshitsuji II.', photo: imageUrls[13] },
    { id: 15, name: 'Лан-Мао', power:'Названая сестра Лау. Молчалива (в манге произносит буквально два слова за все события, в аниме немного больше) и спокойна, беспрекословно слушается Лау. В аниме показывает мастер-класс владения китайским экзотическим оружием.',photo: imageUrls[14] },
    { id: 16, name: 'Лау', power: 'Китайский дворянин, член Шанхайской мафии и глава британского филиала торговой компании «Кунь Лунь».', photo: imageUrls[15] },
    { id: 17, name: 'Мадам Рэд (Ангелина Дюлес)', power: 'Вдова Барона Барнетта, младшая сестра Рэйчел Фантомхайв и тетя Сиэля Фантомхайва. Она, вместе с Греллем Сатклиффом, была ответственна за убийства, приписываемые Джеку Потрошителю.', photo: imageUrls[16] },
    { id: 18, name: 'Мейлин', power: 'Горничная семьи Фантомхайв.', photo:imageUrls[17]  },
    { id: 19, name: 'Себастьян Микаэлис', power: 'Демон-дворецкий дома Фантомхайв.', photo: imageUrls[18] },
    { id: 20, name: 'Сиэль Фантомхайв', power:'Главный герой. Является нынешним главой семьи Фантомхайв и владельцем компании «Фантом». В узких кругах и преступном мире известен как «Сторожевой пес Королевы».',photo: imageUrls[19] },
 { id: 21, name: 'Снейк', power: 'Лакей семьи Фантомхайв. Является бывшим заклинателем змей цирка Ноев Ковчег. Снейк способен понимать змей, и позволяет им говорить через него, а по слухам, и сам является наполовину змеей. Имеет по крайней мере девять имеющих имена змей: Вордсворт, Эмили, Гете, Оскар, Вайлд, Вебстер, Бронте, Дан и Криста.', photo: imageUrls[20] },
    { id: 22, name: 'Сома Асман Кадар', power: 'Часто сокращается до Сома. Принц Бенгалии и один из двадцати шести детей Бенгальского Раджи. У него есть дворецкий — Агни.', photo: imageUrls[21] },
    { id: 23, name: 'Танака', power: 'Управляющий домом Фантомхайв, старый друг семьи и их верный помощник.', photo:imageUrls[22]  },
    { id: 24, name: 'Уильям Т. Спирс', power: 'Жнец, являющийся руководителем Отдела по надзору за жнецами. Он также краткое время был участником цирка Ноев Ковчег, где выступал под сценическим именем Сьют (Sutsu).', photo: imageUrls[23] },
    { id: 25, name: 'Финиан (Финни)', power:'Садовник семьи Фантомхайв.',photo: imageUrls[24] },
    { id: 26, name: 'Фрэд (Фредерик) Аберлайн', power:'Сотрудник Скотланд-Ярда, оптимист, искренне верящий в правосудие. Он часто работает со своим начальником, комиссаром Артуром Рэндаллом.',photo: imageUrls[25] },
 { id: 27, name: 'Ханна Анафелоуз', power: 'Сотрудник Скотланд-Ярда, оптимист, искренне верящий в правосудие. Он часто работает со своим начальником, комиссаром Артуром Рэндаллом.', photo: imageUrls[26] },
    { id: 28, name: 'Чарльз Грей', power: 'Личный секретарь королевы Виктории, а также её дворецкий. Чарльз носит титул графа и является главой рода в своей семейной линии. Его семья насколько известна, что даже, как говорят, в её честь и был назван один из самых распространённых сортов ароматизированного чая (Эрл Грей). Один из "двойников Чарльз".', photo: imageUrls[27] },
    { id: 29, name: 'Эдвард Мидфорд', power: 'Сын Алексис-Леона и Фрэнсис Мидфорд, брат Элизабет Мидфорд, племянник Винсента Фантомхайва и кузен Сиэля Фантомхайва. Префект в Зеленом доме.', photo:imageUrls[28]  },
    { id: 30, name: 'Эдгар Редмонд', power: 'Бывший студент Уэстонского Колледжа. Он был одним из "P4" ("Четвёрки префектов") и главой общежития Алый Лис.', photo: imageUrls[29] },
    { id: 31, name: 'Элизабет Милдфорд', power:'Дочь Алексис-Леона и Фрэнсис Мидфорд, младшая сестра Эдварда Мидфорда, племянница Винсента Фантомхайва и Рэйчел Фантомхайв. Невеста Сиэля Фантомхайва.',photo: imageUrls[30] }

  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const charactersPerPage: number = 5;
  const totalPages: number = Math.ceil(characters.length / charactersPerPage);
  const startIndex: number = (currentPage - 1) * charactersPerPage;
  const endIndex: number = startIndex + charactersPerPage;
  const visibleCharacters: Character[] = characters.slice(startIndex, endIndex);

  const handlePrevious = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
  };

  const handleNext = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };

  const character: Character = characters[currentIndex];
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const popper = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const { styles, attributes } = popper;

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const characterNameStyle: React.CSSProperties = {
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div style={{ textAlign: 'center', textDecoration: 'none' }}>
      <div>
        <button onClick={handlePrevious}>Предыдущий</button>
        <button ref={setReferenceElement} onClick={toggleOpen}>Список персонажей</button>
        <button onClick={handleNext}>Следующий</button>
      </div>
      <h2>{character.name}</h2>
      <img        src={character.photo}
        alt={character.name}
        style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <p>Описание: {character.power}</p>
      {isOpen && (
        <div
          ref={setPopperElement}
          style={{
            ...styles.popper,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          }}
          {...attributes.popper}
        >
          <nav>
            <ul>
              {visibleCharacters.map((char) => (
                <li key={char.id}>
                  <a
                    href={`#character-${char.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const index = characters.findIndex((c) => c.id === char.id);
                      if (index !== -1) {
                        setCurrentIndex(index);
                        setIsOpen(false);
                      }
                    }}
                    style={characterNameStyle}
                  >
                    {char.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{
                  margin: '5px',
                  padding: '5px 10px',
                  backgroundColor: currentPage === pageNumber ? 'lightblue' : 'white',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterTable;
  