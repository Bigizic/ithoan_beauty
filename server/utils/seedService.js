const Services = require('../models/services');
const ServiceGroup = require('../models/service');
const chalk = require('chalk');

const weekdayAvailability = () => [
  {
    day: 'Monday',
    timeRanges: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
  },
  {
    day: 'Tuesday',
    timeRanges: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
  },
  {
    day: 'Wednesday',
    timeRanges: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
  },
  {
    day: 'Thursday',
    timeRanges: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
  },
  {
    day: 'Friday',
    timeRanges: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
  },
  {
    day: 'Saturday',
    timeRanges: [{ startHour: 10, startMinute: 0, endHour: 18, endMinute: 0 }]
  },
  {
    day: 'Sunday',
    timeRanges: [{ startHour: 12, startMinute: 0, endHour: 16, endMinute: 0 }]
  }
];

async function seedServices() {
  try {
    const services = [
      {
        name: "Facials",
        title: "Revitalize Your Skin",
        description: "Our facials are designed to cleanse, rejuvenate, and treat your skin with expert techniques and premium products.",
        subServices: [
          {
            name: "Basic Facials",
            description: "This service is a skincare treatment that nourishes and revitalizes your skin, bringing back that radiant glow. With a hot steam session, gentle manual extraction, and an anti-bacterial skin-calming mask, this comprehensive facial clears impurities, soothes the skin and reveals a clearer and more even-toned complexion.",
            price: 10000,
            duration: 30,
            availability: weekdayAvailability()
          },
          {
            name: "Acne and Pigmentation Facials",
            description: "Targets impurities, calms irritated skin, and improves uneven tone for a clearer complexion.",
            price: 15000,
            duration: 35,
            availability: weekdayAvailability()
          },
          {
            name: "Deep Cleansing Facials",
            description: "A facial treatment that goes beyond a regular cleanse. It typically involves a thorough exfoliation to remove dead skin cells, followed by extractions to clear out clogged pores, and a deep-cleansing mask to purify the skin. Leaving your skin feeling clean, refreshed, and soft.",
            price: 20000,
            duration: 40,
            availability: weekdayAvailability()
          },
          {
            name: "Tohanniees Customized Facials",
            description: "A customized facial treatment tailored to your skin type and concerns. The esthetician will assess your skin and select products and techniques to address your unique needs, whether hydration, acne, anti-aging, or something else.",
            price: 25000,
            duration: 45,
            availability: weekdayAvailability()
          }
        ]
      },
      {
        name: "Spa Packages",
        title: "Relax and Unwind",
        description: "Exclusive spa experiences combining multiple treatments for relaxation and rejuvenation.",
        subServices: [
          {
            name: "Couples Time Out - Essential Treat",
            description: "Basic facials, Signature body exfoliation, Basic Pedicure. Comes with Regular Massage for 2, Deep cleansing Facials for 2, Basic Pedicure for 2, Underarm Waxing for 2, Free wine for 2.",
            price: 33000,
            duration: 60,
            availability: weekdayAvailability()
          },
          {
            name: "Couples Time Out - Customized Skin Treatment Package",
            description: "Tohanniees customized facial, Tohanniees customized body polish, Jelly pedicure, Free wine. Includes a physical consultation appointment with Tohanniees.",
            price: 100000,
            duration: 120,
            availability: weekdayAvailability()
          },
          {
            name: "Luxury Full Day Spa for a Queen",
            description: "Classic lashes, Jelly pedicure, Moroccan body polish, Underarm wax, Full body massage, Tohanniees customized facial, Free wine/ free face mask.",
            price: 100000,
            duration: 90,
            availability: weekdayAvailability()
          },
          {
            name: "The Girls Package for 2",
            description: "Deep cleansing facial for 2, Underarm wax for 2, Signature body exfoliation for 2, Basic pedicure for 2, Free wine for 2.",
            price: 100000,
            duration: 180,
            availability: weekdayAvailability()
          },
          {
            name: "Birthday Treat Package",
            description: "Brazilian wax, Deep cleansing facial, Moroccan body polish, Jelly pedicure, Regular massage, Face kit skincare, A cake, Free wine.",
            price: 130000,
            duration: 120,
            availability: weekdayAvailability()
          }
        ]
      },
      {
        name: "Body Polish",
        title: "Body Polish",
        description: "Invigorating treatments designed to exfoliate, hydrate, and brighten the skin.",
        subServices: [
          {
            name: "Signature Body Exfoliation",
            description: "An exfoliating and hydrating treatment made to rejuvenate your skin. By physically removing dead skin cells through vigorous scrubbing and a gentle scrub, this treatment stimulates skin cell turnover, unveiling a smoother and brighter complexion.",
            price: 15000,
            duration: 30,
            availability: weekdayAvailability()
          },
          {
            name: "Tohanniees Customized Body Polish",
            description: "This treatment uses natural ingredients for a flawless radiant and bright complexion with a combination of Tohanniees skincare signature infusion and scrub.",
            price: 20000,
            duration: 40,
            availability: weekdayAvailability()
          },
          {
            name: "Moroccan Body Polish",
            description: "A traditional Moroccan and Turkish wash that combines a deep exfoliating bath with the use of special Moroccan herbs, black soap, and a hydrating body scrub to effectively eliminate impurities and slough off dead skin cells.",
            price: 25000,
            duration: 45,
            availability: weekdayAvailability()
          }
        ]
      },
      {
        name: "Pedicure Treatment",
        title: "Pamper your feet",
        description: "Revitalizing foot care treatments to refresh and beautify your feet.",
        subServices: [
          {
            name: "Jelly Pedicure",
            description: "This dense and fluffy translucent jelly treatment gently exfoliates, massages tired feet muscles, and softens dry, cracked feet, also involves soaking the feet, trimming and shaping the nails, cuticle care, exfoliation, moisturizing, and nail polish application.",
            price: 15000,
            duration: 30,
            availability: weekdayAvailability()
          },
          {
            name: "Basic Pedicure",
            description: "A basic pedicure usually involves soaking the feet, trimming and shaping the nails, cuticle care, exfoliation, moisturizing, and nail polish application.",
            price: 10000,
            duration: 20,
            availability: weekdayAvailability()
          }
        ]
      },
      {
        name: "Massage & Waxing",
        title: "Smooth and Silky",
        description: "Relaxing massage therapies and professional waxing treatments.",
        subServices: [
          {
            name: "Regular Massage",
            description: "A soothing massage that relaxes the muscles, reduces stress, and promotes overall relaxation.",
            price: 10000,
            duration: 20,
            availability: weekdayAvailability()
          },
          {
            name: "Full Body Massage",
            description: "A comprehensive massage targeting the entire body to ease muscle tension, improve circulation, and restore balance.",
            price: 25000,
            duration: 20,
            availability: weekdayAvailability()
          },
          {
            name: "Head Massage",
            description: "Focused massage on the scalp, neck, and temples to relieve stress, tension headaches, and improve relaxation.",
            price: 10000,
            duration: 30,
            availability: weekdayAvailability()
          },
          {
            name: "Chin Waxing",
            description: "A precise waxing treatment that removes unwanted hair from the chin area, leaving the skin smooth and clean.",
            price: 10000,
            duration: 45,
            availability: weekdayAvailability()
          },
          {
            name: "Brazilian Waxing",
            description: "A thorough waxing treatment that removes hair from the intimate area for a clean and smooth finish.",
            price: 15000,
            duration: 45,
            availability: weekdayAvailability()
          },
          {
            name: "Underarm Waxing",
            description: "Quick and effective waxing to remove underarm hair, leaving skin smooth and fresh.",
            price: 10000,
            duration: 20,
            availability: weekdayAvailability()
          },
          {
            name: "Bikini Line",
            description: "A gentle waxing treatment that tidies up the bikini line for a neat and confident look.",
            price: 15000,
            duration: 20,
            availability: weekdayAvailability()
          },
          {
            name: "Full Legs (both)",
            description: "Complete waxing of both legs from thighs to ankles, giving smooth and silky skin.",
            price: 20000,
            duration: 20,
            availability: weekdayAvailability()
          },
          {
            name: "Full Arms (both)",
            description: "Waxing treatment for both arms from shoulders to wrists, removing unwanted hair for a flawless finish.",
            price: 20000,
            duration: 20,
            availability: weekdayAvailability()
          }
        ]
      },
      {
        name: "Lashes",
        title: "Enhance your Natural Beauty",
        description: "Enhance your beauty with our eyelash extension treatments.",
        subServices: [
          {
            name: "Classic",
            description: "A natural lash extension style where one extension is applied to each natural lash, perfect for a subtle everyday look.",
            price: 17000,
            duration: 60,
            availability: weekdayAvailability()
          },
          {
            name: "Hybrid",
            description: "A blend of classic and volume lash techniques, giving a fuller, textured look that still feels lightweight.",
            price: 20000,
            duration: 90,
            availability: weekdayAvailability()
          },
          {
            name: "Volume",
            description: "Dramatic, fluffy lash extensions created by applying multiple lightweight extensions to each natural lash for maximum fullness.",
            price: 25000,
            duration: 120,
            availability: weekdayAvailability()
          }
        ]
      }
    ];
    const servicesCount = await Services.countDocuments();
    const servicesGroupCount = await ServiceGroup.countDocuments();
    if (servicesCount > 0) {
      await Services.deleteMany({})
    }
    if (servicesGroupCount > 0) {
      await ServiceGroup.deleteMany({})
    }

    for (let svc of services) {
      const parentService = new Services({
        name: svc.name,
        title: svc.title,
        description: svc.description
      });
      await parentService.save();

      const subServiceIds = [];
      for (let sub of svc.subServices) {
        const subService = new ServiceGroup({
          name: sub.name,
          description: sub.description,
          price: sub.price,
          duration: sub.duration,
          availability: sub.availability
        });
        await subService.save();
        subServiceIds.push(subService._id);
      }

      parentService.serviceArray = subServiceIds;
      await parentService.save();

      console.log(`${chalk.green(`✓ saved parent service: ${parentService.name} with ${subServiceIds.length} sub services`)}`);
    }

    console.log(`${chalk.green('✓ All services seeded successfully!')}`);
    return;
  } catch (err) {
    console.log(`${chalk.red(`x Error seeding services: ${err}`)}`);
    process.exit(1);
  }
}

seedServices();
