"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  FileText,
  User,
  Home,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Parent/Guardian", icon: Home },
  { id: 3, title: "Documents", icon: FileText },
  { id: 4, title: "Review", icon: CheckCircle2 },
];

export default function AdmissionsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    previousSchool: "",
    gradeApplying: "",
    
    // Parent/Guardian Info
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
    parentOccupation: "",
    emergencyContact: "",
    emergencyPhone: "",
    
    // Documents
    birthCertificate: null as File | null,
    transcripts: null as File | null,
    idProof: null as File | null,
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    // Validation would go here
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    toast.success("Application submitted successfully! We'll contact you soon.");
    // In production, this would submit to the backend
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file });
    if (file) {
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">EduFlow</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Admissions Application
          </h1>
          <p className="text-lg text-muted-foreground">
            Join our community of learners. Complete your application in 4 easy steps.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-border text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-medium">
            {STEPS.map((step) => (
              <span
                key={step.id}
                className={`flex-1 text-center ${
                  currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
          <Progress value={progress} className="mt-4" />
        </div>

        {/* Form Steps */}
        <Card>
          <CardHeader>
            <CardTitle>
              Step {currentStep}: {STEPS[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({ ...formData, dateOfBirth: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousSchool">Previous School</Label>
                    <Input
                      id="previousSchool"
                      placeholder="ABC School"
                      value={formData.previousSchool}
                      onChange={(e) =>
                        setFormData({ ...formData, previousSchool: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradeApplying">Grade Applying For *</Label>
                    <Select
                      value={formData.gradeApplying}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gradeApplying: value })
                      }
                    >
                      <SelectTrigger id="gradeApplying">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                          <SelectItem key={grade} value={`grade-${grade}`}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Parent/Guardian Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentFirstName">Parent First Name *</Label>
                    <Input
                      id="parentFirstName"
                      placeholder="Jane"
                      value={formData.parentFirstName}
                      onChange={(e) =>
                        setFormData({ ...formData, parentFirstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentLastName">Parent Last Name *</Label>
                    <Input
                      id="parentLastName"
                      placeholder="Doe"
                      value={formData.parentLastName}
                      onChange={(e) =>
                        setFormData({ ...formData, parentLastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Parent Email *</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      placeholder="jane.doe@email.com"
                      value={formData.parentEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, parentEmail: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Parent Phone *</Label>
                    <Input
                      id="parentPhone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.parentPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, parentPhone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentOccupation">Occupation</Label>
                  <Input
                    id="parentOccupation"
                    placeholder="Software Engineer"
                    value={formData.parentOccupation}
                    onChange={(e) =>
                      setFormData({ ...formData, parentOccupation: e.target.value })
                    }
                  />
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contact Name *</Label>
                      <Input
                        id="emergencyContact"
                        placeholder="Emergency Contact Name"
                        value={formData.emergencyContact}
                        onChange={(e) =>
                          setFormData({ ...formData, emergencyContact: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.emergencyPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, emergencyPhone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthCertificate">Birth Certificate *</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="birthCertificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload("birthCertificate", e.target.files?.[0] || null)
                        }
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.birthCertificate && (
                      <p className="text-sm text-secondary flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        {formData.birthCertificate.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transcripts">Academic Transcripts *</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="transcripts"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload("transcripts", e.target.files?.[0] || null)
                        }
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.transcripts && (
                      <p className="text-sm text-secondary flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        {formData.transcripts.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idProof">ID Proof (Passport/ID Card) *</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="idProof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload("idProof", e.target.files?.[0] || null)
                        }
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.idProof && (
                      <p className="text-sm text-secondary flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        {formData.idProof.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                  <p className="font-semibold mb-2">Accepted file formats:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>PDF documents (.pdf)</li>
                    <li>Images (.jpg, .jpeg, .png)</li>
                    <li>Maximum file size: 10MB per file</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    Review Your Application
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Name: {formData.firstName} {formData.lastName}</div>
                        <div>Email: {formData.email}</div>
                        <div>Phone: {formData.phone}</div>
                        <div>Grade: {formData.gradeApplying}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                        Parent/Guardian Information
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Name: {formData.parentFirstName} {formData.parentLastName}</div>
                        <div>Email: {formData.parentEmail}</div>
                        <div>Phone: {formData.parentPhone}</div>
                        <div>Emergency: {formData.emergencyContact}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                        Documents Uploaded
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-secondary" />
                          Birth Certificate: {formData.birthCertificate?.name || "Not uploaded"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-secondary" />
                          Transcripts: {formData.transcripts?.name || "Not uploaded"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-secondary" />
                          ID Proof: {formData.idProof?.name || "Not uploaded"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-blue-900 mb-2">Next Steps:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Review your application carefully</li>
                    <li>Submit your application</li>
                    <li>You'll receive a confirmation email</li>
                    <li>We'll contact you within 3-5 business days</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < STEPS.length ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
