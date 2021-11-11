import { Header } from '../../components/Header';
import api from '../../services/api';
import { ModalAddFood } from '../../components/ModalAddFood';
import { FoodsContainer } from './styles';
import { useEffect, useState } from 'react';
import { Food as FoodTypes } from '../../types';
import {Food} from '../../components/Food';
import { ModalEditFood } from '../../components/ModalEditFood';

export function Dashboard() {
  const [foods, setFoods] = useState<FoodTypes[]>([]); 
  const [editingFoods, setEditingFoods] = useState<FoodTypes>({} as FoodTypes);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods');

      setFoods(response.data);
    }

    getFoods();
  }, []);

  async function handleAddFood(food: FoodTypes) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      });

      setFoods([...foods, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateFood(food: FoodTypes) {
    try {
      const { data: foodUpdated } = await api.put<FoodTypes>(`/foods/${editingFoods.id}`,
        { ...editingFoods, ...food },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.id ? food : foodUpdated,
      );
      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function handleEditFood(food: FoodTypes) {
    setEditingFoods(food);
    setEditModalOpen(true);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFoods}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={() => handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
