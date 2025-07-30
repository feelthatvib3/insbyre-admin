import { ArrowLeftIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(-1);
  }

  return (
    <button
      onClick={handleOnClick}
      className="group hover:bg-united-nations-blue/10 text-united-nations-blue flex cursor-pointer items-center justify-center gap-x-2 rounded-xl px-4 py-2 backdrop-blur-sm transition disabled:cursor-not-allowed disabled:opacity-75"
    >
      <ArrowLeftIcon weight="bold" size={16} />
      Назад
    </button>
  );
}
