import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface GuardianProps {
  children: React.ReactNode;
  redirect?: string;
}

const Guardian: React.FC<GuardianProps> = ({ children, redirect }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("/api/whoami")
      .then((response) => {
        const { data } = response;
        const { user } = data;
        if (!user) {
          if (redirect) {
            navigate(`/login?redirect=${redirect}`);
          } else {
            navigate("/login");
          }
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (redirect) {
          navigate(`/login?redirect=${redirect}`);
        } else {
          navigate("/login");
        }
      });
  }, [redirect, navigate]);

  if (isLoading) {
    <div>loading</div>;
  }
  return <>{children}</>;
};

export default Guardian;
