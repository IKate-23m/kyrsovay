import React, { useState, useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';

interface Story {
  id: number;
  character: string;
  text: string;
}
function Stories() {
  const [stories, setStories] = useState<Story[]>(() => {
    const savedStories = localStorage.getItem('stories');
    return savedStories ? JSON.parse(savedStories) : [
      { id: 1, character: 'История любви', text: 'История о Наруто' },
      { id: 2, character: 'Sasuke', text: 'История о Саске' },
    ];
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const referenceElementRef = useRef<HTMLButtonElement>(null);
  const popperElementRef = useRef<HTMLDivElement>(null);

  const popper = usePopper(referenceElementRef.current, popperElementRef.current, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const { styles, attributes, update } = popper;  

  const [newStory, setNewStory] = useState<Omit<Story, 'id'>>({ character: '', text: '' });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [storyToEdit, setStoryToEdit] = useState<Story | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewStory({ ...newStory, [name]: value });
  };

  const addOrUpdateStory = () => {
    if (newStory.character && newStory.text) {
      let updatedStories: Story[];
      if (storyToEdit) {
        updatedStories = stories.map(story =>
          story.id === storyToEdit.id ? { ...story, ...newStory } : story
        );
      } else {
        const nextId = stories.length > 0 ? Math.max(...stories.map(s => s.id)) + 1 : 1;
        updatedStories = [...stories, { id: nextId, ...newStory}];
      }

      setStories(updatedStories);
      setNewStory({ character: '', text: '' });
      setStoryToEdit(null);
      setIsOpen(false);
      if (update) { 
        update();
      }
    }
  };

  const deleteStory = (id: number) => {
    const updatedStories = stories.filter(story => story.id !== id);
    setStories(updatedStories);
  };

  const editStory = (story: Story) => {
    setNewStory({ character: story.character, text: story.text });
    setStoryToEdit(story);
    setIsOpen(true);
  };

  useEffect(() => {localStorage.setItem('stories', JSON.stringify(stories));
  }, [stories]);

  const filteredStories = stories.filter(story =>
    story.character.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (update) {
      update(); 
    }
  };
return (
    <div>
      <div style={{ flex: 1, padding: '5px', backgroundColor: '#88dded' }}>
        <button
          ref={referenceElementRef}
          onClick={toggleOpen}
        >
          Управление историями
        </button>
        {isOpen && (
          <div ref={popperElementRef} style={{ ...styles.popper, backgroundColor: '#7cc5d9' }} {...attributes.popper}>
            <h3>{storyToEdit ? 'Редактировать историю' : 'Добавить новую историю'}</h3>
            <p>
              <input
                type="text"
                name="character"
                placeholder="Название истории"
                value={newStory.character}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <textarea
                name="text"
                placeholder="Текст"
                value={newStory.text}
                onChange={handleInputChange}
              />
            </p>
            <div>
              <button style={{ backgroundColor: 'navy', color: 'white' }} onClick={addOrUpdateStory}>
                {storyToEdit ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </div>
        )}
      </div>

      <h2>Фанфики</h2>
      <input
        type="text"
        placeholder="Поиск по названию"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredStories.map((story) => (
          <li key={story.id} style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'darkblue',
                color: 'white',
                padding: '5px',
                lineHeight: '1'
              }}>
                <strong>{story.character}</strong>
                <div>
                  <button onClick={() => editStory(story)} style={{ border: 'none', background: 'white', cursor: 'pointer', padding: 0 }}>
                    <img width={10} height={10} src='/redac.png' alt="Редактировать" />
                  </button>
                  <button onClick={() => deleteStory(story.id)} style={{ border: 'none', background: 'white', cursor: 'pointer', padding: 0 }}>
                    <img width={10} height={10} src='/delet.png' alt="Удалить" />
                  </button>
                </div>
              </div>
              <div style={{ padding: '5px', border: '1px solid #ccc', background: 'white', marginTop: '0' }}>
                <p style={{ lineHeight: '1.2' }}>{story.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stories;
