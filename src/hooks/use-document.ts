import { cnpj, cpf } from "cpf-cnpj-validator";

export const formatDocument = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");
  if (onlyNumbers.length <= 11) return cpf.format(onlyNumbers);
  return cnpj.format(onlyNumbers);
};
