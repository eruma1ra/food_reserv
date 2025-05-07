
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqItems = [
    {
      question: "Как забронировать столик?",
      answer: "Выберите ресторан, укажите дату, время и количество гостей, затем подтвердите своё бронирование. Вы получите уведомление о подтверждении по электронной почте или SMS."
    },
    {
      question: "Можно ли отменить или изменить бронирование?",
      answer: "Да, вы можете отменить или изменить бронирование не позднее чем за 2 часа до забронированного времени в своём личном кабинете или связавшись с рестораном напрямую."
    },
    {
      question: "Нужно ли платить за бронирование?",
      answer: "Бронирование столиков через наш сервис бесплатно. Некоторые рестораны могут запрашивать предоплату для подтверждения бронирования в особых случаях, например, в праздничные дни или для больших групп."
    },
    {
      question: "Что делать, если я опаздываю?",
      answer: "Если вы опаздываете, пожалуйста, уведомите ресторан. В большинстве случаев, столик сохраняется за вами в течение 15 минут после забронированного времени."
    },
    {
      question: "Можно ли заказать столик на большую группу?",
      answer: "Да, вы можете забронировать столик для большой группы. Для групп более 8 человек рекомендуется бронировать заранее и связаться с рестораном для уточнения деталей."
    },
    {
      question: "Как узнать, что моё бронирование подтверждено?",
      answer: "После успешного бронирования вы получите подтверждение на указанный вами email или SMS. Также вы можете проверить статус бронирования в своём личном кабинете."
    }
  ];

  
  //FAQ
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-6">Часто задаваемые вопросы</h1>
        <p className="text-muted-foreground mb-12">
          Ответы на популярные вопросы о сервисе бронирования столиков ТолькоРесторан
        </p>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
            <CardDescription>
              Всё, что вам нужно знать о бронировании столиков
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
