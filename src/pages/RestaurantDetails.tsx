import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  Clock,
  ChevronRight,
  ChevronLeft,
  Utensils,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ru } from "date-fns/locale";
import { format } from "date-fns";

// Пример данных о ресторанах
const restaurantsData = [
  {
    id: 1,
    name: "Пушкин",
    description:
      "Легендарный ресторан русской кухни в Москве, воссоздающий атмосферу дворянской усадьбы XIX века. Здесь гости могут насладиться классическими русскими блюдами, приготовленными по старинным рецептам, в интерьере, напоминающем библиотеку аристократического дома с антикварной мебелью, книжными полками и камином.",
    cuisine: "Русская",
    rating: 4.8,
    reviewCount: 1245,
    priceLevel: "₽₽₽",
    address: "Москва, Тверской бульвар, 26А",
    phone: "+7 (495) 123-45-67",
    website: "https://cafe-pushkin.ru",
    openHours: "12:00 - 00:00",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    menu: [
      {
        category: "Закуски",
        items: [
          {
            name: "Оливье с телятиной",
            price: 850,
            description:
              "Классический русский салат с телячьим языком и перепелиными яйцами.",
          },
          {
            name: "Сельдь под шубой",
            price: 720,
            description:
              "Традиционный слоеный салат с филе сельди, овощами и майонезом.",
          },
          {
            name: "Борщ с пампушками",
            price: 890,
            description:
              "Наваристый борщ с говядиной, подается с чесночными пампушками и сметаной.",
          },
        ],
      },
      {
        category: "Основные блюда",
        items: [
          {
            name: "Бефстроганов с картофельным пюре",
            price: 1450,
            description: "Нежная говядина в сливочном соусе с грибами.",
          },
          {
            name: "Котлеты Пожарские",
            price: 1250,
            description:
              "Нежные куриные котлеты в хрустящей панировке с картофельным пюре.",
          },
          {
            name: "Стерлядь в шампанском",
            price: 2300,
            description:
              "Филе стерляди, приготовленное на пару в соусе из шампанского.",
          },
        ],
      },
      {
        category: "Десерты",
        items: [
          {
            name: "Медовик",
            price: 650,
            description:
              "Традиционный слоеный медовый торт со сметанным кремом.",
          },
          {
            name: "Анна Павлова",
            price: 750,
            description: "Воздушное безе с ванильным кремом и свежими ягодами.",
          },
          {
            name: "Сырники со сметаной",
            price: 580,
            description:
              "Домашние сырники из творога, подаются со сметаной и вареньем.",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Александр",
        rating: 5,
        date: "15.07.2023",
        text: "Потрясающее обслуживание и атмосфера. Блюда выше всяких похвал!",
      },
      {
        id: 2,
        author: "Елена",
        rating: 4,
        date: "03.06.2023",
        text: "Очень вкусно, но цены высоковаты. Тем не менее, стоит посетить.",
      },
      {
        id: 3,
        author: "Михаил",
        rating: 5,
        date: "22.05.2023",
        text: "Одно из лучших заведений в Москве. Рекомендую бефстроганов и медовик!",
      },
    ],
  },
  {
    id: 2,
    name: "Сахалин",
    description:
      "Ресторан морепродуктов с панорамным видом на Москву. В меню представлены блюда из свежайших морепродуктов, доставляемых ежедневно.",
    cuisine: "Морепродукты",
    rating: 4.7,
    reviewCount: 876,
    priceLevel: "₽₽₽₽",
    address: "Москва, Смоленская площадь, 3",
    phone: "+7 (495) 782-12-62",
    website: "https://sakhalin-moscow.ru",
    openHours: "12:00 - 00:00",
    images: [
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    menu: [
      {
        category: "Закуски",
        items: [
          {
            name: "Устрицы Хасанские",
            price: 650,
            description: "Свежие устрицы с лимоном и уксусом с луком шалот.",
          },
          {
            name: "Тартар из тунца",
            price: 980,
            description:
              "Нежный тартар из свежего тунца с авокадо и соусом понзу.",
          },
        ],
      },
      {
        category: "Основные блюда",
        items: [
          {
            name: "Краб камчатский на гриле",
            price: 3200,
            description:
              "Свежий камчатский краб, приготовленный на гриле с соусом из сливочного масла.",
          },
          {
            name: "Черная треска мисо",
            price: 2700,
            description:
              "Филе черной трески, маринованное в мисо и запеченное до золотистой корочки.",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Дмитрий",
        rating: 5,
        date: "10.08.2023",
        text: "Потрясающий вид и превосходная кухня! Однозначно стоит своих денег.",
      },
      {
        id: 2,
        author: "Ксения",
        rating: 4,
        date: "25.07.2023",
        text: "Прекрасный ресторан для особых случаев. Морепродукты очень свежие.",
      },
    ],
  },
  {
    id: 3,
    name: "Белуга",
    description:
      "Роскошный ресторан с видом на Кремль, специализирующийся на икре и морепродуктах высочайшего качества.",
    cuisine: "Русская, Европейская",
    rating: 4.9,
    reviewCount: 732,
    priceLevel: "₽₽₽₽",
    address: "Москва, ул. Моховая, 15/1",
    phone: "+7 (495) 901-03-36",
    website: "https://beluga-caviar.ru",
    openHours: "12:00 - 00:00",
    images: [
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    menu: [
      {
        category: "Икра",
        items: [
          {
            name: "Икра белуги",
            price: 18500,
            description: "50 грамм икры белуги с традиционными гарнирами.",
          },
          {
            name: "Икра осетра",
            price: 9800,
            description: "50 грамм икры осетра с традиционными гарнирами.",
          },
        ],
      },
      {
        category: "Основные блюда",
        items: [
          {
            name: "Осетрина на гриле",
            price: 3900,
            description:
              "Стейк из осетрины с соусом из белого вина и картофельным пюре.",
          },
          {
            name: "Телятина Россини",
            price: 4200,
            description: "Медальоны из телятины с фуа-гра и трюфельным соусом.",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Сергей",
        rating: 5,
        date: "05.09.2023",
        text: "Лучшая икра, которую я когда-либо пробовал. Сервис на высочайшем уровне.",
      },
      {
        id: 2,
        author: "Анастасия",
        rating: 5,
        date: "20.08.2023",
        text: "Прекрасный вид на Кремль, изысканная кухня и безупречное обслуживание.",
      },
    ],
  },
  {
    id: 4,
    name: "Северяне",
    description:
      "Современный ресторан скандинавской кухни с акцентом на сезонные продукты и минималистичную подачу.",
    cuisine: "Скандинавская",
    rating: 4.5,
    reviewCount: 562,
    priceLevel: "₽₽",
    address: "Москва, Большая Никитская улица, 12",
    phone: "+7 (499) 348-84-47",
    website: "https://severyane.moscow",
    openHours: "12:00 - 00:00",
    images: [
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607516652104-ff3b212e5e5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    menu: [
      {
        category: "Закуски",
        items: [
          {
            name: "Сельдь с картофелем",
            price: 520,
            description:
              "Филе балтийской сельди с теплым картофелем и горчичным соусом.",
          },
          {
            name: "Тартар из оленины",
            price: 780,
            description:
              "Тартар из мяса северного оленя с ягодами можжевельника и хрустящим хлебом.",
          },
        ],
      },
      {
        category: "Основные блюда",
        items: [
          {
            name: "Лосось с пюре из корнеплодов",
            price: 1150,
            description:
              "Филе лосося с пюре из сезонных корнеплодов и укропным маслом.",
          },
          {
            name: "Утиная грудка с брусничным соусом",
            price: 1280,
            description:
              "Запеченная утиная грудка с брусничным соусом и печеными яблоками.",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Павел",
        rating: 4,
        date: "12.07.2023",
        text: "Интересная скандинавская кухня, демократичные цены и приятная атмосфера.",
      },
      {
        id: 2,
        author: "Мария",
        rating: 5,
        date: "01.06.2023",
        text: "Очень вкусно и необычно. Отдельное спасибо за десерты!",
      },
    ],
  },
  {
    id: 5,
    name: "Twins Garden",
    description:
      "Инновационный ресторан от братьев Березуцких, сочетающий современные кулинарные техники с органическими продуктами с собственной фермы.",
    cuisine: "Современная русская",
    rating: 4.9,
    reviewCount: 645,
    priceLevel: "₽₽₽₽",
    address: "Москва, Страстной бульвар, 8А",
    phone: "+7 (499) 112-33-55",
    website: "https://twinsgarden.ru",
    openHours: "18:00 - 00:00",
    images: [
      "https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    menu: [
      {
        category: "Сеты",
        items: [
          {
            name: "Дегустационный сет 'Огород'",
            price: 7500,
            description:
              "Сет из 8 блюд, основанных на сезонных овощах с фермы.",
          },
          {
            name: "Дегустационный сет 'Гастрономическое путешествие'",
            price: 9800,
            description:
              "12 перемен блюд, представляющих кулинарные традиции разных регионов России.",
          },
        ],
      },
      {
        category: "Основные блюда",
        items: [
          {
            name: "Томленая утка с тыквой",
            price: 3200,
            description:
              "Утка, томленая с травами 24 часа, с пюре из тыквы и соусом из черной смородины.",
          },
          {
            name: "Говяжья вырезка с трюфелем",
            price: 3800,
            description:
              "Вырезка из мраморной говядины с трюфельным соусом и корнеплодами.",
          },
        ],
      },
      {
        category: "Десерты",
        items: [
          {
            name: "Ферментированная груша",
            price: 950,
            description:
              "Груша с фермы, ферментированная с пряностями, с шоколадным ганашем.",
          },
          {
            name: "Мороженое из березового сока",
            price: 780,
            description:
              "Авторское мороженое из собранного березового сока с хрустящей меренгой.",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Виктория",
        rating: 5,
        date: "07.09.2023",
        text: "Удивительные вкусы и текстуры, невероятная подача. Настоящее гастрономическое путешествие!",
      },
      {
        id: 2,
        author: "Игорь",
        rating: 5,
        date: "15.08.2023",
        text: "Один из лучших ресторанов Москвы. Всегда удивляют новыми сочетаниями вкусов.",
      },
      {
        id: 3,
        author: "Алиса",
        rating: 4,
        date: "03.07.2023",
        text: "Очень достойно, особенно впечатлил дегустационный сет. Высокая кухня в лучшем виде.",
      },
    ],
  },
  {
    id: 6,
    name: "Горыныч",
    description:
      "Ресторан с открытым огнем, где блюда готовятся в дровяных печах и на открытом гриле прямо перед гостями.",
    cuisine: "Русская, Пиццерия",
    rating: 4.6,
    reviewCount: 890,
    priceLevel: "₽₽₽",
    address: "Москва, Рождественский бульвар, 1",
    phone: "+7 (495) 995-19-19",
    website: "https://gorynich.com",
    openHours: "12:00 - 00:00",
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1679279726940-be5ce80c632c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1483732594212-58fdd5ef8f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    menu: [
      {
        category: "Из печи",
        items: [
          {
            name: "Печеный картофель с икрой",
            price: 1250,
            description:
              "Запеченный в углях картофель с форелевой икрой и сметаной.",
          },
          {
            name: "Фермерский цыпленок табака",
            price: 1450,
            description:
              "Цыпленок, приготовленный под прессом на открытом огне, с аджикой.",
          },
        ],
      },
      {
        category: "Пицца",
        items: [
          {
            name: "Пицца с белыми грибами",
            price: 950,
            description:
              "Тесто на закваске, белые грибы, сыр страчателла, трюфельное масло.",
          },
          {
            name: "Пицца 'Горыныч'",
            price: 1200,
            description:
              "Авторская пицца с копченой олениной, вялеными томатами и сыром горгонзола.",
          },
        ],
      },
      {
        category: "Десерты",
        items: [
          {
            name: "Наполеон",
            price: 650,
            description:
              "Классический слоеный торт с заварным кремом, приготовленный по семейному рецепту.",
          },
          {
            name: "Печеное яблоко",
            price: 580,
            description:
              "Яблоко, запеченное в печи с медом и орехами, с шариком ванильного мороженого.",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Дмитрий",
        rating: 5,
        date: "22.08.2023",
        text: "Отличный ресторан! Все блюда готовятся на открытом огне, атмосфера уютная, и вкус на высоте.",
      },
      {
        id: 2,
        author: "Светлана",
        rating: 4,
        date: "14.07.2023",
        text: "Очень вкусная пицца из печи, определенно стоит попробовать.",
      },
      {
        id: 3,
        author: "Артем",
        rating: 5,
        date: "01.06.2023",
        text: "Прекрасная кухня, приятный персонал, интересная концепция с открытой кухней.",
      },
    ],
  },
];

// Функция для отображения звездного рейтинга
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("19:00");
  const [guests, setGuests] = useState<string>("2");
  const [restaurantData, setRestaurantData] = useState<any>(null);

  useEffect(() => {
    // Find the restaurant by id from the params
    const restaurant = restaurantsData.find((r) => r.id === Number(id));
    if (restaurant) {
      setRestaurantData(restaurant);
      setCurrentImageIndex(0); // Reset image index when changing restaurants
    }
  }, [id]);

  const nextImage = () => {
    if (restaurantData) {
      setCurrentImageIndex((prev) => (prev + 1) % restaurantData.images.length);
    }
  };

  const prevImage = () => {
    if (restaurantData) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + restaurantData.images.length) %
          restaurantData.images.length
      );
    }
  };

  if (!restaurantData) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold">Ресторан не найден</h2>
        <p className="mt-4">
          К сожалению, запрашиваемый ресторан не существует.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Carousel */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={restaurantData.images[currentImageIndex]}
          alt={restaurantData.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center space-x-2 mb-2">
              <Badge
                variant="outline"
                className="bg-background/20 backdrop-blur-sm text-white border-none"
              >
                {restaurantData.cuisine}
              </Badge>
              <Badge
                variant="outline"
                className="bg-background/20 backdrop-blur-sm text-white border-none"
              >
                {restaurantData.priceLevel}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
              {restaurantData.name}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-white">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{restaurantData.rating}</span>
                <span className="text-white/70">
                  ({restaurantData.reviewCount})
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5 text-white/70" />
                <span>{restaurantData.address}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <Tabs defaultValue="overview">
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="menu">Меню</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <section>
                  <h2 className="text-2xl font-heading font-bold mb-4">
                    О ресторане
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {restaurantData.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Часы работы</h3>
                        <p className="text-muted-foreground">
                          {restaurantData.openHours}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Телефон</h3>
                        <p className="text-muted-foreground">
                          {restaurantData.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Адрес</h3>
                        <p className="text-muted-foreground">
                          {restaurantData.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Сайт</h3>
                        <a
                          href={restaurantData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {restaurantData.website.replace("https://", "")}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery */}
                  <h2 className="text-2xl font-heading font-bold mb-4">
                    Галерея
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {restaurantData.images.map(
                      (image: string, index: number) => (
                        <div
                          key={index}
                          className="rounded-lg overflow-hidden h-60"
                        >
                          <img
                            src={image}
                            alt={`${restaurantData.name} - фото ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )
                    )}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="menu">
                <section>
                  <h2 className="text-2xl font-heading font-bold mb-6">Меню</h2>

                  <div className="space-y-8">
                    {restaurantData.menu.map((category: any) => (
                      <div key={category.category}>
                        <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                          <Utensils className="h-5 w-5 mr-2 text-primary" />
                          {category.category}
                        </h3>
                        <div className="space-y-4">
                          {category.items.map((item: any) => (
                            <div
                              key={item.name}
                              className="p-4 border border-border rounded-lg bg-card"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {item.description}
                                  </p>
                                </div>
                                <div className="font-medium text-primary">
                                  {item.price} ₽
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="reviews">
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-heading font-bold">
                      Отзывы
                      <span className="ml-2 text-lg text-muted-foreground">
                        ({restaurantData.reviewCount})
                      </span>
                    </h2>
                    <Button disabled>Оставить отзыв</Button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mb-8">
                    {restaurantData.reviews.map((review: any) => (
                      <div
                        key={review.id}
                        className="p-6 border border-border rounded-lg bg-card"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <div className="text-sm text-muted-foreground">
                              {review.date}
                            </div>
                          </div>
                          <RatingStars rating={review.rating} />
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Booking Form */}
          <div className="md:w-1/3">
            <Card className="sticky top-8 border border-border">
              <CardContent className="pt-6">
                <h3 className="text-xl font-heading font-bold mb-6">
                  Забронировать столик
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label>Дата</Label>
                    <div className="mt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date
                              ? format(date, "PPP", { locale: ru })
                              : "Выберите дату"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="p-0">
                          <DialogHeader className="p-4 border-b">
                            <DialogTitle>Выберите дату</DialogTitle>
                          </DialogHeader>
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            locale={ru}
                            initialFocus
                            className="p-4 pointer-events-auto"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div>
                    <Label>Время</Label>
                    <Select defaultValue={time} onValueChange={setTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                        <SelectItem value="19:00">19:00</SelectItem>
                        <SelectItem value="20:00">20:00</SelectItem>
                        <SelectItem value="21:00">21:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Количество гостей</Label>
                    <Select defaultValue={guests} onValueChange={setGuests}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите количество гостей" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 гость</SelectItem>
                        <SelectItem value="2">2 гостя</SelectItem>
                        <SelectItem value="3">3 гостя</SelectItem>
                        <SelectItem value="4">4 гостя</SelectItem>
                        <SelectItem value="5">5 гостей</SelectItem>
                        <SelectItem value="6">6 гостей</SelectItem>
                        <SelectItem value="7">7 гостей</SelectItem>
                        <SelectItem value="8">8 гостей</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Имя</Label>
                    <Input placeholder="Введите ваше имя" className="mt-1" />
                  </div>

                  <div>
                    <Label>Телефон</Label>
                    <Input placeholder="+7 (___) ___-__-__" className="mt-1" />
                  </div>

                  <div>
                    <Label>Комментарий (необязательно)</Label>
                    <Input placeholder="Особые пожелания" className="mt-1" />
                  </div>

                  <Button className="w-full">Забронировать</Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая на кнопку, вы соглашаетесь с условиями бронирования
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
