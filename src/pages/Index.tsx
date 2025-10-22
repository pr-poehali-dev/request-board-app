import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const categories = [
  { id: 'electronics', name: 'Электроника', icon: 'Smartphone' },
  { id: 'clothes', name: 'Одежда', icon: 'Shirt' },
  { id: 'home', name: 'Для дома', icon: 'Home' },
  { id: 'services', name: 'Услуги', icon: 'Briefcase' },
  { id: 'other', name: 'Другое', icon: 'Package' },
];

const mockRequests = [
  {
    id: 1,
    title: 'Ищу iPhone 15 Pro',
    description: 'Нужен iPhone 15 Pro в хорошем состоянии, желательно с коробкой и документами',
    budget: '120 000 ₽',
    category: 'electronics',
    author: { name: 'Андрей М.', avatar: '', rating: 4.8, reviews: 12 },
    responses: 7,
    createdAt: '2 часа назад',
  },
  {
    id: 2,
    title: 'Ищу мастера по ремонту MacBook',
    description: 'MacBook Pro 2020, не включается. Нужен опытный мастер для диагностики и ремонта',
    budget: 'до 15 000 ₽',
    category: 'services',
    author: { name: 'Мария К.', avatar: '', rating: 5.0, reviews: 8 },
    responses: 12,
    createdAt: '5 часов назад',
  },
  {
    id: 3,
    title: 'Куплю настольную лампу в стиле лофт',
    description: 'Ищу стильную настольную лампу для рабочего стола, предпочтительно черный металл',
    budget: '5 000 ₽',
    category: 'home',
    author: { name: 'Дмитрий С.', avatar: '', rating: 4.5, reviews: 5 },
    responses: 3,
    createdAt: '1 день назад',
  },
];

const mockResponses = [
  {
    id: 1,
    requestTitle: 'Ищу iPhone 15 Pro',
    message: 'Есть iPhone 15 Pro 256GB, состояние отличное, все документы. 115 000₽',
    price: '115 000 ₽',
    seller: { name: 'Игорь П.', avatar: '', rating: 4.9, reviews: 24 },
    createdAt: '30 минут назад',
  },
  {
    id: 2,
    requestTitle: 'Ищу iPhone 15 Pro',
    message: 'iPhone 15 Pro 512GB, новый, запечатанный. 130 000₽. Можно встретиться в центре.',
    price: '130 000 ₽',
    seller: { name: 'Алексей В.', avatar: '', rating: 4.7, reviews: 18 },
    createdAt: '1 час назад',
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);

  const filteredRequests = selectedCategory
    ? mockRequests.filter((req) => req.category === selectedCategory)
    : mockRequests;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-blue-50/20">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-transparent shadow-lg animate-slide-up">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 gradient-vibrant blur-md opacity-50 rounded-2xl"></div>
                <div className="relative w-12 h-12 rounded-2xl gradient-vibrant flex items-center justify-center shadow-xl animate-scale-in">
                  <Icon name="Zap" size={26} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#FF6B6B] via-[#6C5CE7] to-[#4ECDC4] bg-clip-text text-transparent tracking-tight">
                  Marketplace
                </h1>
                <p className="text-xs text-gray-500 font-medium">Запросы и предложения</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative hover:bg-purple-50">
                <Icon name="Bell" size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6B6B] rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-purple-50">
                <Icon name="Search" size={20} className="text-gray-600" />
              </Button>
              <div className="relative group">
                <div className="absolute inset-0 gradient-secondary blur-sm opacity-0 group-hover:opacity-50 rounded-full transition-opacity"></div>
                <Avatar className="relative border-2 border-purple-200 cursor-pointer">
                  <AvatarFallback className="gradient-secondary text-white font-bold">U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white shadow-lg rounded-2xl p-1.5 animate-fade-in">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Icon name="Search" size={18} />
              <span className="hidden sm:inline">Запросы</span>
            </TabsTrigger>
            <TabsTrigger value="my-requests" className="flex items-center gap-2">
              <Icon name="FileText" size={18} />
              <span className="hidden sm:inline">Мои запросы</span>
            </TabsTrigger>
            <TabsTrigger value="my-responses" className="flex items-center gap-2">
              <Icon name="MessageSquare" size={18} />
              <span className="hidden sm:inline">Отклики</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={18} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8">
            <div className="relative rounded-3xl overflow-hidden gradient-vibrant p-8 md:p-12 text-white shadow-2xl animate-fade-in">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">
                  Найди то, что ищешь
                </h2>
                <p className="text-lg md:text-xl mb-6 opacity-90">
                  Размещай запросы и получай предложения от продавцов
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-[#FF6B6B] hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl font-semibold">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Создать запрос
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Создать новый запрос</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Заголовок</label>
                        <Input placeholder="Например: Ищу iPhone 15 Pro" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Категория</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Описание</label>
                        <Textarea
                          placeholder="Опишите подробно, что вы ищете..."
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Бюджет (опционально)</label>
                        <Input placeholder="Например: до 50 000 ₽" />
                      </div>
                      <Button className="w-full gradient-primary text-white">
                        Опубликовать запрос
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-20 w-48 h-48 bg-white rounded-full blur-3xl" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Популярные категории</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in">
                {categories.map((cat) => (
                  <Card
                    key={cat.id}
                    className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-[#6C5CE7] rounded-2xl animate-scale-in"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab('requests');
                    }}
                  >
                    <CardContent className="p-6 text-center group">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl gradient-purple flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon name={cat.icon as any} size={32} className="text-white" />
                      </div>
                      <p className="font-semibold group-hover:text-[#6C5CE7] transition-colors">{cat.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-1">Лента запросов</h3>
                  <p className="text-gray-500 text-sm">Актуальные предложения от покупателей</p>
                </div>
                <Button variant="outline" className="hover:bg-[#6C5CE7] hover:text-white transition-all font-semibold border-2" onClick={() => setActiveTab('requests')}>
                  Все запросы
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
              <div className="space-y-4">
                {mockRequests.map((request, index) => (
                  <Card key={request.id} className="hover:shadow-2xl transition-all duration-300 group rounded-2xl border-2 hover:border-[#6C5CE7] animate-fade-in overflow-hidden" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className="gradient-accent text-white border-0 shadow-md font-semibold text-xs px-3 py-1">
                              {categories.find((c) => c.id === request.category)?.name}
                            </Badge>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Icon name="Clock" size={12} />
                              {request.createdAt}
                            </span>
                          </div>
                          <Button variant="ghost" size="icon" className="-mt-2 -mr-2">
                            <Icon name="Bookmark" size={18} className="text-gray-400 group-hover:text-[#6C5CE7]" />
                          </Button>
                        </div>
                        
                        <h4 className="text-xl font-bold mb-2 group-hover:text-[#6C5CE7] transition-colors duration-300">
                          {request.title}
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {request.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-purple-100">
                              <AvatarFallback className="text-xs gradient-primary text-white font-semibold">
                                {request.author.name.split(' ').map((n) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm">{request.author.name}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="flex items-center gap-0.5">
                                  <Icon name="Star" size={12} className="fill-[#FFE66D] text-[#FFE66D]" />
                                  <span className="font-medium">{request.author.rating}</span>
                                </div>
                                <span>•</span>
                                <span>{request.author.reviews} отзывов</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="text-right mr-2">
                              <p className="text-lg font-bold text-[#FF6B6B]">{request.budget}</p>
                              <p className="text-xs text-gray-500">{request.responses} откликов</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col gap-2 p-4 md:p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 md:w-48 border-t md:border-t-0 md:border-l border-gray-100">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="flex-1 gradient-primary text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold">
                              <Icon name="Send" size={16} className="mr-2" />
                              Откликнуться
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Оставить предложение</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div>
                                <label className="text-sm font-medium mb-2 block">Ваше предложение</label>
                                <Textarea
                                  placeholder="Опишите ваше предложение, цену и условия..."
                                  rows={4}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-2 block">Цена</label>
                                <Input placeholder="Например: 115 000 ₽" />
                              </div>
                              <Button className="w-full gradient-primary text-white">
                                Отправить предложение
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" className="flex-1 hover:bg-white font-semibold">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center gap-4 mb-6 overflow-x-auto">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? 'gradient-primary text-white' : ''}
              >
                Все категории
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? 'gradient-secondary text-white' : ''}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="gradient-accent text-white border-0">
                        {categories.find((c) => c.id === request.category)?.name}
                      </Badge>
                      <span className="text-xs text-gray-500">{request.createdAt}</span>
                    </div>
                    <CardTitle>{request.title}</CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs gradient-primary text-white">
                            {request.author.name.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{request.author.name}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Icon name="Star" size={12} className="fill-[#FFE66D] text-[#FFE66D]" />
                            {request.author.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#FF6B6B]">{request.budget}</p>
                        <p className="text-xs text-gray-500">{request.responses} откликов</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1 gradient-primary text-white">
                          Оставить предложение
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Оставить предложение</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Ваше предложение</label>
                            <Textarea
                              placeholder="Опишите ваше предложение, цену и условия..."
                              rows={4}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Цена</label>
                            <Input placeholder="Например: 115 000 ₽" />
                          </div>
                          <Button className="w-full gradient-primary text-white">
                            Отправить предложение
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="icon">
                      <Icon name="Heart" size={18} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Мои запросы</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-primary text-white">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Создать запрос
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Создать новый запрос</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Заголовок</label>
                      <Input placeholder="Например: Ищу iPhone 15 Pro" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Категория</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Описание</label>
                      <Textarea
                        placeholder="Опишите подробно, что вы ищете..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Бюджет (опционально)</label>
                      <Input placeholder="Например: до 50 000 ₽" />
                    </div>
                    <Button className="w-full gradient-primary text-white">
                      Опубликовать запрос
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockRequests.slice(0, 2).map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="gradient-accent text-white border-0">
                        {categories.find((c) => c.id === request.category)?.name}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                    <CardTitle>{request.title}</CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#FF6B6B]">{request.budget}</p>
                      <Badge variant="secondary">{request.responses} откликов</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Icon name="MessageSquare" size={18} className="mr-2" />
                      Посмотреть отклики ({request.responses})
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-responses" className="space-y-6">
            <h3 className="text-2xl font-bold">Мои отклики</h3>
            <div className="space-y-4">
              {mockResponses.map((response) => (
                <Card key={response.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{response.requestTitle}</CardTitle>
                        <CardDescription>{response.message}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreVertical" size={18} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#4ECDC4]">{response.price}</p>
                      <span className="text-xs text-gray-500">{response.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl gradient-primary text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Пользователь</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="fill-[#FFE66D] text-[#FFE66D]" />
                        <span className="font-semibold">4.8</span>
                      </div>
                      <span>24 отзыва</span>
                      <span>15 сделок</span>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Icon name="Edit" size={18} className="mr-2" />
                    Редактировать
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Статистика</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-[#FF6B6B] mb-1">8</p>
                        <p className="text-sm text-gray-600">Активных запросов</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-[#4ECDC4] mb-1">23</p>
                        <p className="text-sm text-gray-600">Откликов получено</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-[#FFE66D] mb-1">15</p>
                        <p className="text-sm text-gray-600">Сделок завершено</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Последние отзывы</h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="gradient-secondary text-white text-sm">
                                ИП
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium">Игорь П.</p>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Icon
                                      key={star}
                                      name="Star"
                                      size={14}
                                      className="fill-[#FFE66D] text-[#FFE66D]"
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">
                                Отличный покупатель, быстро отвечает, все прошло гладко!
                              </p>
                              <span className="text-xs text-gray-500 mt-1 block">2 дня назад</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;