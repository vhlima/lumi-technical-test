import { ClientAddressModel, ClientModel } from "@/data/models";
import { Invoice } from "@/domain/entities";
import {
  formatDateToBrazilianTimeFormat,
  parseMonthByIndex,
} from "@/utils/date-utils";

export const mockPdfTextContent = (invoice: Partial<Invoice>): string[][] => {
  const expensesMapped = (invoice?.expenses || []).map((expense, index) => {
    const expenseItem = [];

    if (index === 0) {
      expenseItem.push("");
    }

    expenseItem.push(expense.name);
    if (expense.measurementUnit) {
      expenseItem.push("");
      expenseItem.push(expense.measurementUnit);
    }
    if (expense.quantity) {
      expenseItem.push("");
      expenseItem.push(String(expense.quantity));
    }
    if (expense.unitaryPrice) {
      expenseItem.push("");
      expenseItem.push(String(expense.unitaryPrice));
    }
    expenseItem.push("");
    expenseItem.push(String(expense.price));
    if (expense.unitaryPrice) {
      expenseItem.push("");
      expenseItem.push(String(expense.unitaryTaxPrice));
    }

    return expenseItem;
  });

  const client: ClientModel = {
    id: invoice.client ? invoice.client.id : -1,
    fullName: invoice.client ? invoice.client.fullName : "",
  };

  const address: ClientAddressModel = {
    id: invoice.address?.id || -1,
    city: invoice.address?.city || "",
    district: invoice.address?.district || "",
    state: invoice.address?.state || "",
    streetAddress: invoice.address?.streetAddress || "",
    zipCode: invoice.address?.zipCode || "",
  };

  const price = invoice.price ? String(invoice.price) : "";

  const relativeTo =
    invoice.relativeMonth && invoice.relativeYear
      ? `${parseMonthByIndex(invoice.relativeMonth)}/${invoice.relativeYear}`
      : "";

  const relativeToReduced =
    invoice.relativeMonth && invoice.relativeYear
      ? `${parseMonthByIndex(invoice.relativeMonth)
          .slice(0, 3)
          .toUpperCase()}/${invoice.relativeYear}`
      : "";

  const expiresAt = invoice.expiresAt
    ? formatDateToBrazilianTimeFormat(invoice.expiresAt)
    : "";

  return [
    ["Valores Faturados"],
    [
      "",
      "Itens da Fatura",
      " ",
      "Unid.",
      " ",
      "Quant.",
      " ",
      "Preço Unit",
      " ",
      "Valor",
      " ",
      "(R$)",
      " ",
      "PIS/COFINS",
      " ",
      "Base Calc.",
      " ",
      "Aliq.",
      " ",
      "ICMS",
      " ",
      "Tarifa Unit.",
    ],
    ["ICMS", " ", "ICMS"],
    ...expensesMapped,
    ["", "TOTAL", " ", price],
    ["", "Histórico de Consumo"],
    ["", "MÊS/ANO", " ", "Cons. kWh", " ", "Média kWh/Dia", " ", "Dias"],
    ["", "ABR/23", " ", "1.341", " ", "44,70", " ", "30"],
    ["", "MAR/23", " ", "1.771", " ", "53,66", " ", "33"],
    ["", "FEV/23", " ", "1.343", " ", "47,96", " ", "28"],
    ["", "JAN/23", " ", "1.054", " ", "35,13", " ", "30"],
    ["", "DEZ/22", " ", "1.109", " ", "33,60", " ", "33"],
    ["", "NOV/22", " ", "1.206", " ", "29,41", " ", "41"],
    ["", "OUT/22", " ", "0", " ", "0,00", " ", "0"],
    ["", "SET/22", " ", "0", " ", "0,00", " ", "0"],
    ["", "AGO/22", " ", "0", " ", "0,00", " ", "0"],
    ["", "JUL/22", " ", "0", " ", "0,00", " ", "0"],
    ["", "JUN/22", " ", "0", " ", "0,00", " ", "0"],
    ["", "MAI/22", " ", "0", " ", "0,00", " ", "0"],
    ["", "ABR/22", " ", "0", " ", "0,00", " ", "0", "", "Reservado ao Fisco"],
    ["", "SEM VALOR FISCAL"],
    ["", "Base de cálculo (R$)", " ", "Alíquota (%)", " ", "Valor (R$)"],
    [
      "",
      "Fale com CEMIG: 116 - CEMIG Torpedo 29810 - Ouvidoria CEMIG: 0800 728 3838 -",
      " ",
      "Agência Nacional de Energia Elétrica - ANEEL - Telefone: 167 - Ligação gratuita de telefones fixos e móveis.",
    ],
    [
      "",
      "Código de Débito Automático",
      " ",
      "Instalação",
      " ",
      "Vencimento",
      " ",
      "Total a pagar",
    ],
    ["", "008118741548", " ", String(address.id), " ", expiresAt, " ", price],
    [
      relativeTo,
      " ",
      "83690000001-6 57490138010-9 20644858233-1 08118741548-4",
    ],
    [
      "",
      "NnNnWwNwNnWnNnNnWwWnNwNnNnNnWwWwNnNnNnWwWwNnNnNnWwWwNnWwNnNwNnWnNnNnNwWnWwNnWnNwWwNnWwNwNnNnWnWnNnNwWwNnWnNnNwNwWnNnWnNwNwWnNnWnWwNnNwNwNnWnNwWnWwNnWnNwNnNwWwNnNnWnWnWnNwNwNnWwNnNnWnNwWwNnNnNwWnNnNnNwWnWwWwNnNwNnWnNwNnWnNwWnWnN",
      "",
      client.fullName,
    ],
    ["", address.streetAddress],
    [address.district],
    [`${address.zipCode} ${address.city}, ${address.state}`],
    ["CPF 097.7**.***-**"],
    ["", "Nº DO CLIENTE", " ", "Nº DA INSTALAÇÃO"],
    [
      "",
      String(client.id),
      " ",
      String(address.id),
      "",
      "Referente a",
      " ",
      "Vencimento",
      " ",
      "Valor a pagar (R$)",
    ],
    ["", `${relativeToReduced}`, " ", expiresAt, " ", price],
    ["", "NOTA FISCAL Nº 027811849 - SÉRIE 000"],
    ["Data de emissão: 25/04/2023"],
    ["Consulte pela chave de acesso em:"],
    ["http://www.sped.fazenda.mg.gov.br/spedmg/nf3e"],
    ["chave de acesso:"],
    ["31230406981180000116660000278118491028158384"],
    ["Protocolo de autorização: 1312300032027172"],
    ["25.04.2023 às 23:12:44"],
    [
      "",
      "Classe",
      " ",
      "Subclasse",
      " ",
      "Modalidade Tarifária",
      " ",
      "Datas de Leitura",
    ],
    [
      "",
      "Comercial",
      " ",
      "Outros serviços",
      " ",
      "Convencional B3",
      " ",
      "Anterior",
      " ",
      "Atual",
      " ",
      "Nº de dias Próxima",
    ],
    [
      "Trifásico",
      " ",
      "e outras atividades",
      " ",
      "14/03",
      " ",
      "13/04",
      " ",
      "30",
      " ",
      "15/05",
    ],
    ["", "Informações Técnicas"],
    [
      "",
      "Tipo de Medição",
      " ",
      "Medição",
      " ",
      "Leitura",
      " ",
      "Leitura",
      " ",
      "Constante",
      " ",
      "Consumo kWh",
    ],
    ["Anterior", " ", "Atual", " ", "de Multiplicação"],
    [
      "",
      "Energia kWh",
      " ",
      "AHB988002788",
      " ",
      "29.800",
      " ",
      "31.141",
      " ",
      "1",
      " ",
      "1.341",
      "",
      "DOCUMENTO AUXILIAR DA NOTA FISCAL DE ENERGIA ELÉTRICA ELETRÔNICA",
      " ",
      "SEGUNDA VIA",
    ],
    [
      "",
      "CEMIG DISTRIBUIÇÃO S.A. CNPJ 06.981.180/0001-16 / INSC. ESTADUAL 062.322136.0087.",
    ],
    ["AV. BARBACENA, 1200 - 17° ANDAR - ALA 1 - BAIRRO SANTO AGOSTINHO"],
    [
      "CEP: 30190-131 - BELO HORIZONTE - MG.",
      " ",
      "TARIFA SOCIAL DE ENERGIA ELÉTRICA - TSEE FOI CRIADA PELA LEI Nº 10.438, DE 26 DE ABRIL DE 2002",
    ],
    ["", "Informações Gerais"],
    [
      "",
      "SALDO ATUAL DE GERAÇÃO: 2.233,80 kWh. Tarifa vigente conforme Res Aneel nº 3.046, de 21/06/2022.",
    ],
    [
      "Redução aliquota ICMS conforme Lei Complementar 194/22. Unidade faz parte de sistema de compensação",
    ],
    [
      "de energia. O pagamento desta conta não quita débitos anteriores. Para estes, estão sujeitas penalidades",
    ],
    [
      "legais vigentes (multas) e/ou atualização financeira (juros)baseadas no vencimento das mesmas. Leitura",
    ],
    [
      "realizada conforme calendário de faturamento. É dever do consumidor manter os dados cadastrais sempre",
    ],
    [
      "atualizados e informar alterações da atividade exercida no local. Faça sua adesão para recebimento da conta",
    ],
    [
      "de energia por e-mail acessando www.cemig.com.br. MAR/23 Band. Verde - ABR/23 Band. Verde.",
    ],
  ];
};
