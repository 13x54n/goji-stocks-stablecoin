import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Award, Clock, Star, Users } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to Cryptocurrency",
    description: "Learn the basics of digital currencies and blockchain technology",
    duration: "2 hours",
    difficulty: "Beginner",
    rating: 4.8,
    students: 15420,
    lessons: 12,
    progress: 100,
    status: "completed",
    thumbnail: "📚",
    reward: "50 points"
  },
  {
    id: 2,
    title: "Trading Strategies for Beginners",
    description: "Master the fundamentals of crypto trading and risk management",
    duration: "4 hours",
    difficulty: "Beginner",
    rating: 4.9,
    students: 12850,
    lessons: 18,
    progress: 75,
    status: "in-progress",
    thumbnail: "📈",
    reward: "100 points"
  },
  {
    id: 3,
    title: "Advanced DeFi Protocols",
    description: "Deep dive into decentralized finance and yield farming",
    duration: "6 hours",
    difficulty: "Advanced",
    rating: 4.7,
    students: 8920,
    lessons: 24,
    progress: 0,
    status: "available",
    thumbnail: "🏦",
    reward: "200 points"
  },
  {
    id: 4,
    title: "NFT Marketplace Guide",
    description: "Everything you need to know about NFTs and digital art",
    duration: "3 hours",
    difficulty: "Intermediate",
    rating: 4.6,
    students: 11200,
    lessons: 15,
    progress: 0,
    status: "available",
    thumbnail: "🎨",
    reward: "150 points"
  },
  {
    id: 5,
    title: "Blockchain Security Best Practices",
    description: "Learn how to keep your crypto assets safe and secure",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    rating: 4.9,
    students: 15680,
    lessons: 14,
    progress: 0,
    status: "available",
    thumbnail: "🔒",
    reward: "120 points"
  },
  {
    id: 6,
    title: "Smart Contracts Development",
    description: "Build and deploy your first smart contract",
    duration: "8 hours",
    difficulty: "Advanced",
    rating: 4.8,
    students: 5640,
    lessons: 32,
    progress: 0,
    status: "available",
    thumbnail: "⚡",
    reward: "300 points"
  }
];

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    earned: true,
    points: 10
  },
  {
    id: 2,
    title: "Crypto Scholar",
    description: "Complete 5 courses",
    icon: "🎓",
    earned: false,
    points: 50
  },
  {
    id: 3,
    title: "Trading Pro",
    description: "Complete trading strategies course",
    icon: "💼",
    earned: false,
    points: 100
  },
  {
    id: 4,
    title: "DeFi Expert",
    description: "Master advanced DeFi protocols",
    icon: "🏆",
    earned: false,
    points: 200
  }
];

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Beginner</Badge>;
    case "Intermediate":
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Intermediate</Badge>;
    case "Advanced":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Advanced</Badge>;
    default:
      return null;
  }
};

export function LearningPage() {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Rewards</h1>
        <p className="text-muted-foreground">Expand your crypto knowledge and earn rewards</p>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Courses Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-green-400">+1 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4" />
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">Available for rewards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Study Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h 30m</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1/4</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={`${achievement.earned ? 'ring-2 ring-green-500/50' : ''}`}>
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold text-sm">{achievement.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                <Badge variant="outline" className="text-xs">
                  {achievement.points} points
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Courses */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl">{course.thumbnail}</div>
                  {getDifficultyBadge(course.difficulty)}
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    {course.status === "completed" ? (
                      <Button variant="outline" className="w-full">
                        <Award className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    ) : course.status === "in-progress" ? (
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Course
                      </Button>
                    )}
                  </div>

                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      Earn {course.reward}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
