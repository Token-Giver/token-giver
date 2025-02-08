const ProfileIcon = ({
  width = "2em",
  height = "2em",
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 15.5C21.3137 15.5 24 12.8137 24 9.5C24 6.18629 21.3137 3.5 18 3.5C14.6863 3.5 12 6.18629 12 9.5C12 12.8137 14.6863 15.5 18 15.5Z"
        fill="#00594C"
      />
      <path
        opacity="0.5"
        d="M18 32C23.799 32 28.5 29.3137 28.5 26C28.5 22.6863 23.799 20 18 20C12.201 20 7.5 22.6863 7.5 26C7.5 29.3137 12.201 32 18 32Z"
        fill="#00594C"
      />
    </svg>
  );
};

export default ProfileIcon;
